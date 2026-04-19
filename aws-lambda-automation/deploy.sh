#!/bin/bash

# AWS Lambda Automation System Deployment Script
# This script deploys the CloudFormation stack for the AWS automation system

set -e

# Configuration
STACK_NAME="aws-lambda-automation-system"
TEMPLATE_FILE="cloudformation-template.yaml"
REGION="us-east-1"
EMAIL_ADDRESS="your-email@example.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}AWS Lambda Automation System Deployment${NC}"
echo "=========================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if user is logged in
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# Prompt for email address
read -p "Enter email address for notifications [$EMAIL_ADDRESS]: " user_email
EMAIL_ADDRESS=${user_email:-$EMAIL_ADDRESS}

# Prompt for region
read -p "Enter AWS region [$REGION]: " user_region
REGION=${user_region:-$REGION}

echo -e "${YELLOW}Deploying CloudFormation stack: $STACK_NAME${NC}"
echo "Region: $REGION"
echo "Email: $EMAIL_ADDRESS"
echo ""

# Check if stack already exists
if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION &> /dev/null; then
    echo -e "${YELLOW}Stack $STACK_NAME already exists. Updating...${NC}"
    OPERATION="update-stack"
else
    echo -e "${YELLOW}Creating new stack: $STACK_NAME${NC}"
    OPERATION="create-stack"
fi

# Deploy the stack
aws cloudformation $OPERATION \
    --stack-name $STACK_NAME \
    --template-body file://$TEMPLATE_FILE \
    --parameters ParameterKey=EmailAddress,ParameterValue=$EMAIL_ADDRESS \
    --capabilities CAPABILITY_NAMED_IAM \
    --region $REGION

echo ""
echo -e "${YELLOW}Waiting for stack creation/update to complete...${NC}"

# Wait for stack creation/update
aws cloudformation wait stack-${OPERATION//-stack/}-complete \
    --stack-name $STACK_NAME \
    --region $REGION

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Stack deployment completed successfully!${NC}"
    echo ""

    # Get stack outputs
    echo -e "${GREEN}Stack Outputs:${NC}"
    aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --region $REGION \
        --query 'Stacks[0].Outputs' \
        --output table

    echo ""
    echo -e "${GREEN}Next Steps:${NC}"
    echo "1. Check your email ($EMAIL_ADDRESS) and confirm the SNS subscription"
    echo "2. Tag your EC2 instances with: Key='Automation', Value='Schedule'"
    echo "3. Tag your Auto Scaling Groups with: Key='Automation', Value='Schedule'"
    echo "4. Tag your RDS instances with: Key='Automation', Value='Schedule'"
    echo "5. Monitor the CloudWatch dashboard for automation metrics"
    echo ""
    echo -e "${YELLOW}Note: The automation will run automatically based on the CloudWatch Events schedule.${NC}"

else
    echo -e "${RED}Stack deployment failed!${NC}"
    echo "Check the CloudFormation console for error details."
    exit 1
fi