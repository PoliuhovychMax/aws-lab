locals{
    routes = {
        get_all_users = {
            path = "users"
            method = "GET"
            lambda_name = "get-all-users"
        }

        get_all_posts = {
            path = "posts"
            method = "GET"
            lambda_name = "get-all-posts"
        }

        get_post = {
            path = "posts/{id}"
            method = "GET"
            lambda_name = "get-post"
        }
        
        save_post = {
            path = "posts"
            method = "POST"
            lambda_name = "save-post"
        }

        update_post= {
            path = "posts/{id}"
            method = "PUT"
            lambda_name = "update-post"
        }

        delete_post = {
            path = "posts/{id}"
            method = "DELETE"
            lambda_name = "delete-post"
        }
    }
}

resource "aws_api_gateway_rest_api" "api" {
  name = "api"
}

resource "aws_api_gateway_resource" "posts" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_rest_api.api.root_resource_id
  path_part = "posts"
}

resource "aws_api_gateway_resource" "post_id" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_resource.posts.id
  path_part = "{id}"
}

resource "aws_api_gateway_resource" "users" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id = aws_api_gateway_rest_api.api.root_resource_id
  path_part = "users"
}

locals {
  resource_map = {
    "posts" = aws_api_gateway_resource.posts.id
    "posts/{id}" = aws_api_gateway_resource.post_id.id
    "users" = aws_api_gateway_resource.users.id
  }
}

resource "aws_api_gateway_method" "methods" {
  for_each = local.routes

  rest_api_id =  aws_api_gateway_rest_api.api.id
  resource_id = local.resource_map[each.value.path]

  http_method = each.value.method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integrations" {
  for_each = local.routes

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = local.resource_map[each.value.path]

  http_method = aws_api_gateway_method.methods[each.key].http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"

  uri = aws_lambda_function.lambda[each.value.lambda_name].invoke_arn
}

resource "aws_api_gateway_stage" "prod" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  deployment_id = aws_api_gateway_deployment.deployment.id
  stage_name = "prod"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  depends_on = [
    aws_api_gateway_integration.integrations
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_method" "options" {
  for_each = local.resource_map

  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = each.value
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options" {
  for_each = local.resource_map

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = each.value
  http_method = aws_api_gateway_method.options[each.key].http_method

  type = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "options" {
  for_each = local.resource_map

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = each.value
  http_method = aws_api_gateway_method.options[each.key].http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "options" {
  for_each = local.resource_map

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = each.value
  http_method = aws_api_gateway_method.options[each.key].http_method
  status_code = aws_api_gateway_method_response.options[each.key].status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}