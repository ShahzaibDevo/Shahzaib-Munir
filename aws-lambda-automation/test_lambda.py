#!/usr/bin/env python3
"""
Test script for AWS Lambda Automation System
Run this locally to validate the Lambda function logic before deployment.
"""

import json
import sys
import os
from unittest.mock import Mock, patch, MagicMock
import boto3

# Add the lambda function to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the lambda function
from lambda_function import (
    lambda_handler,
    start_ec2_instances,
    stop_ec2_instances,
    manage_autoscaling_groups,
    manage_rds_snapshots,
    send_notification,
    log_to_cloudwatch,
    track_cost_savings
)

def test_lambda_handler():
    """Test the main lambda handler function."""
    print("Testing lambda_handler...")

    # Mock event
    event = {
        'action': 'all'
    }

    # Mock context
    context = Mock()
    context.aws_request_id = 'test-request-id'

    # Mock environment variables
    with patch.dict(os.environ, {
        'SNS_TOPIC_ARN': 'arn:aws:sns:us-east-1:123456789012:test-topic',
        'LOG_GROUP_NAME': '/aws/lambda/test-automation'
    }):
        # Mock AWS services
        with patch('boto3.client') as mock_client:
            mock_ec2 = Mock()
            mock_autoscaling = Mock()
            mock_rds = Mock()
            mock_sns = Mock()
            mock_logs = Mock()
            mock_cloudwatch = Mock()

            # Configure mock clients
            mock_client.side_effect = lambda service: {
                'ec2': mock_ec2,
                'autoscaling': mock_autoscaling,
                'rds': mock_rds,
                'sns': mock_sns,
                'logs': mock_logs,
                'cloudwatch': mock_cloudwatch
            }.get(service, Mock())

            # Mock EC2 responses
            mock_ec2.describe_instances.return_value = {
                'Reservations': [{
                    'Instances': [{
                        'InstanceId': 'i-1234567890abcdef0',
                        'State': {'Name': 'stopped'},
                        'Tags': [{'Key': 'Automation', 'Value': 'Schedule'}]
                    }]
                }]
            }
            mock_ec2.start_instances.return_value = {'StartingInstances': []}
            mock_ec2.stop_instances.return_value = {'StoppingInstances': []}

            # Mock Auto Scaling responses
            mock_autoscaling.describe_auto_scaling_groups.return_value = {
                'AutoScalingGroups': [{
                    'AutoScalingGroupName': 'test-asg',
                    'Tags': [{'Key': 'Automation', 'Value': 'Schedule'}]
                }]
            }
            mock_autoscaling.update_auto_scaling_group.return_value = {}

            # Mock RDS responses
            mock_rds.describe_db_instances.return_value = {
                'DBInstances': [{
                    'DBInstanceIdentifier': 'test-db',
                    'DBInstanceStatus': 'available',
                    'Tags': [{'Key': 'Automation', 'Value': 'Schedule'}]
                }]
            }
            mock_rds.create_db_snapshot.return_value = {
                'DBSnapshot': {'DBSnapshotIdentifier': 'test-snapshot'}
            }
            mock_rds.stop_db_instance.return_value = {}

            # Mock SNS
            mock_sns.publish.return_value = {'MessageId': 'test-message-id'}

            # Mock CloudWatch Logs
            mock_logs.create_log_stream.return_value = {}
            mock_logs.put_log_events.return_value = {'nextSequenceToken': '1'}

            # Mock CloudWatch Metrics
            mock_cloudwatch.put_metric_data.return_value = {}

            try:
                result = lambda_handler(event, context)
                print("✓ lambda_handler test passed")
                print(f"Result: {json.dumps(result, indent=2)}")
                return True
            except Exception as e:
                print(f"✗ lambda_handler test failed: {e}")
                return False

def test_individual_functions():
    """Test individual functions."""
    print("\nTesting individual functions...")

    # Mock clients
    mock_ec2 = Mock()
    mock_sns = Mock()
    mock_logs = Mock()
    mock_cloudwatch = Mock()

    # Test send_notification
    try:
        send_notification("Test message", "Test subject", mock_sns, "arn:aws:sns:us-east-1:123456789012:test-topic")
        print("✓ send_notification test passed")
    except Exception as e:
        print(f"✗ send_notification test failed: {e}")

    # Test log_to_cloudwatch
    try:
        log_to_cloudwatch("Test log message", mock_logs, "/aws/lambda/test")
        print("✓ log_to_cloudwatch test passed")
    except Exception as e:
        print(f"✗ log_to_cloudwatch test failed: {e}")

    # Test track_cost_savings
    try:
        track_cost_savings(5, 10, mock_cloudwatch)
        print("✓ track_cost_savings test passed")
    except Exception as e:
        print(f"✗ track_cost_savings test failed: {e}")

def run_tests():
    """Run all tests."""
    print("Running AWS Lambda Automation System Tests")
    print("=" * 50)

    # Test lambda handler
    handler_success = test_lambda_handler()

    # Test individual functions
    test_individual_functions()

    print("\n" + "=" * 50)
    if handler_success:
        print("✓ All critical tests passed!")
        return True
    else:
        print("✗ Some tests failed. Please check the implementation.")
        return False

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)