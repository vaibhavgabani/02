@echo off
echo Starting Express Application...

:: Pull the latest image
docker pull vaibhavgabani/express-app:latest

:: Run the container
docker run -d --rm -p 3010:3000 --name express-app vaibhavgabani/express-app:latest

echo Application started! Opening browser...

:: Open browser
start http://localhost:3010

echo Express app is running at: http://localhost:3010
