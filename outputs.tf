output "lambda_names"{
  value = [for l in aws_lambda_function.lambda : l.function_name]
}

output "lambda_arns" {
  value = [for l in aws_lambda_function.lambda : l.arn]
}