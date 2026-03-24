terraform {
  backend "s3"{
    bucket = "637703784593-terraform-tfstate"
    key    = "terraform/tfstate"
    region = "eu-central-1"

    dynamodb_table = "terraform-tfstate-lock"
  }
}