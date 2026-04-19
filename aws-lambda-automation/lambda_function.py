import boto3
import json
import os
from datetime import datetime, timezone
import logging

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
ec2 = boto3.client('ec2')
autoscaling = boto3.client('autoscaling')
rds = boto3.client('rds')
sns = boto3.client('sns')
cloudwatch = boto3.client('cloudwatch')

# Environment variables
SNS_TOPIC_ARN = os.environ['SNS_TOPIC_ARN']
LOG_GROUP_NAME = os.environ['LOG_GROUP_NAME']

def log_to_cloudwatch(message, level='INFO'):
    """Log message to CloudWatch Logs"""
    timestamp = datetime.now(timezone.utc).isoformat()
    log_message = f"[{timestamp}] {level}: {message}"

    # Send to CloudWatch Logs
    logs = boto3.client('logs')
    logs.put_log_events(
        logGroupName=LOG_GROUP_NAME,
        logStreamName='automation-logs',
        logEvents=[{
            'timestamp': int(datetime.now(timezone.utc).timestamp() * 1000),
            'message': log_message
        }]
    )

    logger.info(message)

def send_notification(subject, message):
    """Send notification via SNS"""
    try:
        sns.publish(
            TopicArn=SNS_TOPIC_ARN,
            Subject=subject,
            Message=message
        )
        log_to_cloudwatch(f"Notification sent: {subject}")
    except Exception as e:
        log_to_cloudwatch(f"Failed to send notification: {str(e)}", 'ERROR')

def get_instances_by_tag(tag_key, tag_value):
    """Get EC2 instances by tag"""
    response = ec2.describe_instances(
        Filters=[
            {
                'Name': f'tag:{tag_key}',
                'Values': [tag_value]
            }
        ]
    )

    instances = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instances.append(instance)

    return instances

def start_ec2_instances():
    """Start EC2 instances tagged for automation"""
    try:
        instances = get_instances_by_tag('Automation', 'Schedule')

        if not instances:
            log_to_cloudwatch("No EC2 instances found for scheduled start")
            return

        instance_ids = [instance['InstanceId'] for instance in instances
                       if instance['State']['Name'] == 'stopped']

        if instance_ids:
            ec2.start_instances(InstanceIds=instance_ids)
            log_to_cloudwatch(f"Started EC2 instances: {', '.join(instance_ids)}")

            # Send notification
            send_notification(
                "EC2 Instances Started",
                f"Started {len(instance_ids)} EC2 instances during working hours: {', '.join(instance_ids)}"
            )

            # Track cost savings
            track_cost_savings('EC2_Start', len(instance_ids))
        else:
            log_to_cloudwatch("No stopped EC2 instances to start")

    except Exception as e:
        log_to_cloudwatch(f"Error starting EC2 instances: {str(e)}", 'ERROR')
        send_notification("EC2 Automation Error", f"Failed to start EC2 instances: {str(e)}")

def stop_ec2_instances():
    """Stop EC2 instances tagged for automation"""
    try:
        instances = get_instances_by_tag('Automation', 'Schedule')

        if not instances:
            log_to_cloudwatch("No EC2 instances found for scheduled stop")
            return

        instance_ids = [instance['InstanceId'] for instance in instances
                       if instance['State']['Name'] == 'running']

        if instance_ids:
            ec2.stop_instances(InstanceIds=instance_ids)
            log_to_cloudwatch(f"Stopped EC2 instances: {', '.join(instance_ids)}")

            # Send notification
            send_notification(
                "EC2 Instances Stopped",
                f"Stopped {len(instance_ids)} EC2 instances during idle hours: {', '.join(instance_ids)}"
            )

            # Track cost savings
            track_cost_savings('EC2_Stop', len(instance_ids))
        else:
            log_to_cloudwatch("No running EC2 instances to stop")

    except Exception as e:
        log_to_cloudwatch(f"Error stopping EC2 instances: {str(e)}", 'ERROR')
        send_notification("EC2 Automation Error", f"Failed to stop EC2 instances: {str(e)}")

def manage_auto_scaling():
    """Manage Auto Scaling Groups"""
    try:
        # Get Auto Scaling Groups tagged for automation
        response = autoscaling.describe_auto_scaling_groups()

        for asg in response['AutoScalingGroups']:
            tags = {tag['Key']: tag['Value'] for tag in asg.get('Tags', [])}

            if tags.get('Automation') == 'Schedule':
                # During working hours, ensure minimum capacity
                # During idle hours, scale down to minimum
                current_hour = datetime.now().hour

                if 6 <= current_hour < 18:  # Working hours
                    if asg['DesiredCapacity'] < asg['MinSize']:
                        autoscaling.set_desired_capacity(
                            AutoScalingGroupName=asg['AutoScalingGroupName'],
                            DesiredCapacity=asg['MinSize']
                        )
                        log_to_cloudwatch(f"Scaled up ASG {asg['AutoScalingGroupName']} to {asg['MinSize']} instances")
                else:  # Idle hours
                    if asg['DesiredCapacity'] > asg['MinSize']:
                        autoscaling.set_desired_capacity(
                            AutoScalingGroupName=asg['AutoScalingGroupName'],
                            DesiredCapacity=asg['MinSize']
                        )
                        log_to_cloudwatch(f"Scaled down ASG {asg['AutoScalingGroupName']} to {asg['MinSize']} instances")

    except Exception as e:
        log_to_cloudwatch(f"Error managing Auto Scaling Groups: {str(e)}", 'ERROR')

def manage_rds_snapshots():
    """Create RDS snapshots and manage shutdown"""
    try:
        # Get RDS instances tagged for automation
        response = rds.describe_db_instances()

        for db_instance in response['DBInstances']:
            tags = {tag['Key']: tag['Value'] for tag in db_instance.get('TagList', [])}

            if tags.get('Automation') == 'Schedule':
                instance_id = db_instance['DBInstanceIdentifier']

                # Create snapshot before shutdown
                snapshot_id = f"{instance_id}-{datetime.now().strftime('%Y%m%d-%H%M%S')}"

                rds.create_db_snapshot(
                    DBSnapshotIdentifier=snapshot_id,
                    DBInstanceIdentifier=instance_id
                )

                log_to_cloudwatch(f"Created RDS snapshot: {snapshot_id}")

                # Stop the instance during idle hours
                current_hour = datetime.now().hour
                if not (6 <= current_hour < 18):  # Idle hours
                    rds.stop_db_instance(DBInstanceIdentifier=instance_id)
                    log_to_cloudwatch(f"Stopped RDS instance: {instance_id}")

                    send_notification(
                        "RDS Instance Stopped",
                        f"RDS instance {instance_id} stopped during idle hours. Snapshot created: {snapshot_id}"
                    )

    except Exception as e:
        log_to_cloudwatch(f"Error managing RDS: {str(e)}", 'ERROR')

def track_cost_savings(action, count):
    """Track cost savings metrics"""
    try:
        # Send metrics to CloudWatch
        if action == 'EC2_Start':
            cloudwatch.put_metric_data(
                Namespace='AWSAutomation',
                MetricData=[
                    {
                        'MetricName': 'EC2InstancesStarted',
                        'Value': count,
                        'Unit': 'Count'
                    }
                ]
            )
        elif action == 'EC2_Stop':
            cloudwatch.put_metric_data(
                Namespace='AWSAutomation',
                MetricData=[
                    {
                        'MetricName': 'EC2InstancesStopped',
                        'Value': count,
                        'Unit': 'Count'
                    }
                ]
            )

        log_to_cloudwatch(f"Cost savings tracked: {action} - {count} instances")

    except Exception as e:
        log_to_cloudwatch(f"Error tracking cost savings: {str(e)}", 'ERROR')

def lambda_handler(event, context):
    """Main Lambda handler"""
    try:
        action = event.get('action', 'all')

        log_to_cloudwatch(f"AWS Automation Lambda triggered with action: {action}")

        if action in ['start_ec2', 'all']:
            start_ec2_instances()

        if action in ['stop_ec2', 'all']:
            stop_ec2_instances()

        if action in ['autoscaling', 'all']:
            manage_auto_scaling()

        if action in ['rds', 'all']:
            manage_rds_snapshots()

        # Send summary notification
        send_notification(
            "AWS Automation Completed",
            f"AWS automation cycle completed successfully at {datetime.now().isoformat()}"
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Automation completed successfully')
        }

    except Exception as e:
        error_message = f"AWS Automation failed: {str(e)}"
        log_to_cloudwatch(error_message, 'ERROR')
        send_notification("AWS Automation Error", error_message)

        return {
            'statusCode': 500,
            'body': json.dumps(error_message)
        }