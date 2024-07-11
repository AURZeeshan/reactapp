# AWS Infrastructure Setup

This repository contains Terraform scripts to set up a basic web application infrastructure on AWS, along with an Ansible playbook to configure the EC2 instance.

## Infrastructure Components

- VPC with public and private subnets across two availability zones.
- Internet Gateway and corresponding route tables for internet access.
- Public-facing Load Balancer.
- EC2 instance in the public subnet running Nginx.
- RDS instance in the private subnet running MySQL.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) installed.
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) installed.
- AWS CLI configured with appropriate credentials.
- SSH key for EC2 instance access.

## Setup and Run Terraform Scripts

1. **Navigate to the Terraform directory**:

    ```sh
    cd aws-infra
    ```

2. **Initialize Terraform**:

    ```sh
    terraform init
    ```

3. **Validate the configuration**:

    ```sh
    terraform validate
    ```

4. **Plan the deployment**:

    ```sh
    terraform plan
    ```

5. **Apply the configuration**:

    ```sh
    terraform apply
    ```

6. **Note down the public IP of the EC2 instance and the DNS name of the load balancer**.

## Run Ansible Playbook

1. **Navigate to the Ansible directory**:

    ```sh
    cd ansible-playbook
    ```

2. **Update the `inventory` file** with the public IP of the EC2 instance.

3. **Run the playbook**:

    ```sh
    ansible-playbook -i inventory playbook.yml
    ```

## Assumptions

- The EC2 instance is using the Amazon Linux 
