# main.tf

# Configure the AWS provider
provider "aws" {
  region = "us-east-1"  # Change to your desired AWS region
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
resource "aws_instance" "web_server" {
  ami           = "ami-xxxxxxxxxxxxxxxx"  # Replace with your desired AMI ID
  instance_type = "t2.micro"              # Change instance type as needed

  tags = {
    Name = "web-server"
  }

  # Attach the security group to the instance
  security_groups = [aws_security_group.web_server_sg.name]

  # Provision the instance with a script (optional)
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y nginx",  # Install Nginx or your preferred web server
      "sudo systemctl start nginx"
    ]
  }
}
