#!/bin/bash

echo "========================================="
echo "  Running Express API Docker Container   "
echo "========================================="

# Check if the container already exists and remove it if needed
if [ "$(docker ps -a --filter "name=express-app" --format "{{.Names}}")" == "express-app" ]; then
    echo "Removing existing express-app container..."
    docker rm -f express-app
fi

# Pull the latest image
echo "Pulling the latest image from Docker Hub..."
docker pull vaibhavgabani/express-app:latest

# Run the container with port mapping
echo "Starting the container with port mapping (3010:3000)..."
docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest

# Wait for the container to start
echo "Waiting for the application to start..."
sleep 2

# Try to open the application in the default browser (works on most systems)
echo "Attempting to open the application in your browser..."
if [ "$(uname)" == "Darwin" ]; then
    # macOS
    open "http://localhost:3010"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    # Linux with xdg-open
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:3010"
    fi
fi

echo "========================================="
echo "  Container is running successfully!     "
echo "  - Web interface: http://localhost:3010 "
echo "  - API endpoint:  http://localhost:3010/api"
echo "========================================="
