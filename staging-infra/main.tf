# main.tf

# Configure the AWS provider
provider "aws" {
  region = "us-east-1"  # Change to your desired AWS region
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "public1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-west-2a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-2b"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-west-2a"
}

resource "aws_subnet" "private2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-west-2b"
}


resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public1" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public.id
}



# Create a security group
resource "aws_security_group" "web_server_sg" {
  name        = "web-server-sg"
  description = "Security group for web server"

  # Allow inbound HTTP traffic from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow inbound SSH traffic from your IP address (for administration)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["your-ip-address/32"]  # Replace with your IP address
  }

  # Allow outbound traffic to anywhere
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an EC2 instance for hosting the React application
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 AMI (choose the appropriate one for your region)
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public1.id
  security_groups = [aws_security_group.web_sg.name]

  user_data = <<-EOF
                #!/bin/bash
                sudo apt-get update
                sudo apt-get install -y docker.io
                sudo docker run -d -p 3306:3306 my-docker-hub-account/mysql:latest
                EOF

  tags = {
    Name = "WebServer"
  }
}
