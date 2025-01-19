#!/bin/bash

# Start Backend Services
echo "Starting Backend Services..."

# Go to the backend directory
cd ./backend

# Start the order service
echo "Starting Order Service..."
cd ./product-order-service
mv .env.example .env
yarn install
yarn start &
cd ..

# Start the cart service
echo "Starting Custome Service..."
cd ./customer-service
mv .env.example .env
yarn install
yarn start &
cd ..

# # Go back to the root
cd ..

# # Start Frontend
echo "Starting Frontend..."

# # Go to the frontend directory
cd ./project-23
yarn install
yarn dev

# # End of Script
echo "All services are running!"
