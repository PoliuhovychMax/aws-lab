terraform {
  backend "s3"{
    bucket = "637703784593-terraform-tfstate"
    key    = "terraform/tfstate"
    region = "eu-central-1"

    dynamodb_table = "terraform-tfstate-lock"
  }
}

module "courses_table" {
    source = "./modules/dynamodb"
    table_name = "courses"
}

module "authors_table" {
    source = "./modules/dynamodb"
    table_name = "authors"
}

locals {
  lambdas = {
    get_all_authors = "get-all-authors"
    get_all_courses = "get-all-courses"
    get_course      = "get-course"
    save_course     = "save-course"
    update_course   = "update-course"
    delete_course   = "delete-course"
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_dynamodb_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_dynamodb_policy"
  description = "Lambda policy for DynamoDB access and logging"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:eu-central-1:637703784593:table/courses"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_lambda_function" "this" {
  for_each = local.lambdas

  function_name = each.value
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  filename      = "lambda/${each.value}.zip"
  role          = aws_iam_role.lambda_role.arn
}
