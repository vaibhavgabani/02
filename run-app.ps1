# PowerShell script to automatically pull and run the Express app

Write-Host "========================================="
Write-Host "  Running Express API Docker Container   "
Write-Host "========================================="

# Check if the container already exists and remove it if needed
$containerExists = docker ps -a --filter "name=express-app" --format "{{.Names}}"
if ($containerExists -eq "express-app") {
    Write-Host "Removing existing express-app container..."
    docker rm -f express-app
}

# Pull the latest image
Write-Host "Pulling the latest image from Docker Hub..."
docker pull vaibhavgabani/express-app:latest

# Run the container with port mapping
Write-Host "Starting the container with port mapping (3010:3000)..."
docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest

# Wait for the container to start
Write-Host "Waiting for the application to start..."
Start-Sleep -Seconds 2

# Open the application in the default browser
Write-Host "Opening the application in your browser..."
Start-Process "http://localhost:3010"

Write-Host "========================================="
Write-Host "  Container is running successfully!     "
Write-Host "  - Web interface: http://localhost:3010 "
Write-Host "  - API endpoint:  http://localhost:3010/api"
Write-Host "========================================="
