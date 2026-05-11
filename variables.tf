variable "function_name" { 
    default = "my-lambda"
}

variable "lambdas" {
  default = {
    get-all-posts = {file = "lambda/get-all-posts.zip"}
    save-post = {file = "lambda/save-post.zip"}
    update-post = {file = "lambda/update-post.zip"}
    get-post = {file = "lambda/get-post.zip"}
    delete-post = {file = "lambda/delete-post.zip"}
  }
}