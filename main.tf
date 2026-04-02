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

resource "aws_iam_role" "lambda_role" {
  name = "arn_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "basic" {
  role = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamo_access" {
  name = "lambda_dynamo_access"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        Effect = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_lambda_function" "lambda" {
  for_each = var.lambdas

  function_name = each.key
  role = aws_iam_role.lambda_role.arn

  handler = "index.handler"
  runtime = "nodejs18.x"

  filename = "${path.module}/${each.value.file}"
}