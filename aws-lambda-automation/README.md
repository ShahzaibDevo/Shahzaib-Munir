# AWS Lambda Automation System

A comprehensive AWS automation system that manages EC2 instances, Auto Scaling Groups, and RDS databases with cost optimization, monitoring, and notifications.

## Features

### 🔄 Automated Resource Management
- **EC2 Instance Management**: Automatically start/stop instances based on schedules
- **Auto Scaling Groups**: Dynamic scaling based on working hours
- **RDS Management**: Automated snapshots and instance shutdown during idle periods

### ⏰ Intelligent Scheduling
- **Working Hours**: 6 AM - 6 PM (instances running)
- **Idle Hours**: 6 PM - 6 AM (instances stopped/cost optimized)
- **Flexible Configuration**: Easy to modify schedules via CloudWatch Events

### 📊 Monitoring & Notifications
- **Real-time Notifications**: SNS email alerts for all automation events
- **Comprehensive Logging**: CloudWatch Logs for all actions and errors
- **Cost Tracking**: Metrics dashboard showing cost savings

### 🛡️ Error Handling & Reliability
- **Rollback Mechanisms**: Automatic error recovery and notifications
- **Comprehensive Error Handling**: Detailed error logging and alerting
- **Idempotent Operations**: Safe to run multiple times

### 📈 Cost Optimization
- **Automated Shutdown**: Stop unused resources during off-hours
- **Cost Tracking**: Monitor and report savings achieved
- **Resource Tagging**: Target specific resources for automation

## Architecture

```
CloudWatch Events ──┐
                     ├── Lambda Function
SNS Notifications ───┤
                     ├── EC2 Management
CloudWatch Logs ─────┤
                     ├── Auto Scaling
CloudWatch Metrics ──┤
                     └── RDS Management
```

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured
- Email address for notifications

## Quick Start

### 1. Clone and Deploy

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### 2. Configure Resources

Tag your AWS resources for automation:

**EC2 Instances:**
```bash
aws ec2 create-tags \
    --resources i-1234567890abcdef0 \
    --tags Key=Automation,Value=Schedule
```

**Auto Scaling Groups:**
```bash
aws autoscaling create-or-update-tags \
    --tags ResourceId=my-asg,ResourceType=auto-scaling-group,Key=Automation,Value=Schedule
```

**RDS Instances:**
```bash
aws rds add-tags-to-resource \
    --resource-name arn:aws:rds:us-east-1:123456789012:db:my-db-instance \
    --tags Key=Automation,Value=Schedule
```

### 3. Monitor Automation

- **CloudWatch Dashboard**: Access via AWS Console
- **Email Notifications**: Check your configured email
- **Logs**: View detailed logs in CloudWatch Logs

## Detailed Configuration

### CloudWatch Events Schedule

The system uses the following default schedules:

- **Start Instances**: `cron(0 6 * * ? *)` - 6 AM daily
- **Stop Instances**: `cron(0 18 * * ? *)` - 6 PM daily
- **Full Automation**: `rate(1 hour)` - Every hour

### Customizing Schedules

Modify the CloudFormation template or update CloudWatch Events rules:

```bash
# Example: Change start time to 7 AM
aws events put-rule \
    --name "aws-lambda-automation-system-start-instances" \
    --schedule-expression "cron(0 7 * * ? *)"
```

### Environment Variables

The Lambda function uses these environment variables:

- `SNS_TOPIC_ARN`: ARN of the SNS topic for notifications
- `LOG_GROUP_NAME`: CloudWatch Log Group name

## Monitoring Dashboard

The system creates a CloudWatch dashboard with:

- **EC2 Automation Metrics**: Instances started/stopped over time
- **Automation Logs**: Real-time log streaming
- **Cost Savings Tracking**: Visual representation of savings

Access the dashboard:
```
https://<region>.console.aws.amazon.com/cloudwatch/home?region=<region>#dashboards:name=<stack-name>-dashboard
```

## Cost Optimization

### Estimated Savings

Based on typical usage patterns:

- **EC2 Instances**: 40-60% cost reduction (16 hours idle daily)
- **RDS Instances**: 30-50% cost reduction (with snapshots)
- **Auto Scaling**: Dynamic cost optimization based on demand

### Cost Tracking

The system tracks:
- Number of instances started/stopped
- Automation events
- Error rates
- Resource utilization metrics

## Security Considerations

### IAM Permissions

The Lambda function uses least-privilege IAM policies:

- EC2: Start/Stop instances, manage tags
- Auto Scaling: Modify desired capacity
- RDS: Create snapshots, stop/start instances
- SNS: Send notifications
- CloudWatch: Write metrics and logs

### Resource Tagging

Only resources tagged with `Automation: Schedule` are affected by the automation.

### Network Security

- Lambda functions run in your VPC if configured
- Use security groups and NACLs appropriately
- Monitor CloudTrail for audit trails

## Troubleshooting

### Common Issues

1. **Lambda Function Errors**
   - Check CloudWatch Logs for detailed error messages
   - Verify IAM permissions
   - Ensure proper resource tagging

2. **SNS Notifications Not Received**
   - Confirm email subscription confirmation
   - Check SNS topic permissions
   - Verify email address format

3. **Resources Not Being Managed**
   - Verify resource tagging (`Automation: Schedule`)
   - Check resource state (running/stopped)
   - Review CloudWatch Events triggers

### Debugging

```bash
# Check Lambda function logs
aws logs tail /aws/lambda/aws-lambda-automation-system-automation --follow

# Test Lambda function manually
aws lambda invoke \
    --function-name aws-lambda-automation-system-automation \
    --payload '{"action": "all"}' \
    output.json
```

## Advanced Configuration

### Custom Lambda Functions

You can extend the system by:

1. Adding new automation actions
2. Integrating with additional AWS services
3. Implementing custom scheduling logic
4. Adding more notification channels

### Multi-Region Deployment

Deploy to multiple regions by:

1. Updating the CloudFormation template
2. Configuring cross-region SNS topics
3. Setting up regional CloudWatch dashboards

### Integration with CI/CD

Integrate with your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Deploy Infrastructure
  run: |
    aws cloudformation deploy \
      --template-file cloudformation-template.yaml \
      --stack-name my-automation-stack
```

## API Reference

### Lambda Function Input

```json
{
  "action": "all|start_ec2|stop_ec2|autoscaling|rds"
}
```

### Supported Actions

- `all`: Run complete automation cycle
- `start_ec2`: Start tagged EC2 instances
- `stop_ec2`: Stop tagged EC2 instances
- `autoscaling`: Manage Auto Scaling Groups
- `rds`: Manage RDS snapshots and shutdown

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Check the troubleshooting section
- Review CloudWatch logs
- Open an issue on GitHub
- Contact the development team

---

**Note**: This automation system is designed for cost optimization and operational efficiency. Always test in a development environment before deploying to production.