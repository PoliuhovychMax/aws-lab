output "lambda_names"{
  value = [for l in aws_lambda_function.lambda : l.function_name]
}

output "lambda_arns" {
  value = [for l in aws_lambda_function.lambda : l.arn]
}

output "api_url" {
  value = "https://${aws_api_gateway_rest_api.api.id}.execute-api.eu-central-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}"
}