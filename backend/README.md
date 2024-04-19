# Backend Node.js Application

## Description
This Node.js application provides sets up an Express server to handle POST requests to the '/create-order' endpoint. It integrates with Razorpay to generate payment orders in USD currency. Upon receiving a request, it creates a new order with the specified amount, captures payment, and returns the order details including the order ID, currency, and amount in the response. Additionally, it utilizes shortid to generate unique receipt IDs for each order.

## Installation
1. Clone the repository to your local machine:
```bash
git clone https://github.com/ankitsinha1112/calai.git
```
2. Install the required dependencies, run the following command:
```bash
npm install
```
## Usage
To start the server, run the following command:
```bash
nodemon index.js
```

## Endpoints

### Signup
Endpoint: /api/razorpay
Method: POST
Description: 
This Node.js API sets up an Express server to handle POST requests to the '/create-order' endpoint. It integrates with Razorpay to generate payment orders in USD currency. Upon receiving a request, it creates a new order with the specified amount, captures payment, and returns the order details including the order ID, currency, and amount in the response. Additionally, it utilizes shortid to generate unique receipt IDs for each order.


## Dependencies

- express: Fast, unopinionated, minimalist web framework for Node.js.