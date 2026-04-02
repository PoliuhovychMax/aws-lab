variable "function_name" { 
    default = "my-lambda"
}

variable "lambdas" {
  default = {
    get-all-authors ={file = "lambda/get-all-authors.zip"}
    get-all-courses = {file = "lambda/get-all-courses.zip"}
    save-course = {file = "lambda/save-course.zip"}
    update-course = {file = "lambda/update-course.zip"}
    get-course = {file = "lambda/get-course.zip"}
    delete-course = {file = "lambda/delete-course.zip"}
  }
}