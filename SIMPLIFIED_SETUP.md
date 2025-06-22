# Update the DOCKER_INSTRUCTIONS.md to include the new features

# Simplified Express Application Setup with Docker

This document provides instructions for running the Express API using Docker, with several simplified options.

## Quick Start Options

### Option 1: One-Click Run Scripts (Simplest)

#### Windows:
```
start-app.bat
```

#### Mac/Linux:
```bash
chmod +x start-app
./start-app
```

These scripts will automatically pull the image, run the container with proper port mapping, and open the application in your browser.

### Option 2: Using Docker Compose

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

### Option 3: Manual Docker Commands

```bash
# Pull the image
docker pull vaibhavgabani/express-app:latest

# Run the container with port mapping
docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest
```

## Application Access

After starting the container, access the application at:
- Web interface: http://localhost:3010
- API endpoint: http://localhost:3010/api

## Enhanced Features

- **Port Mapping Detection**: The application detects if ports are properly mapped
- **Auto-setup Scripts**: Simple one-click scripts to run the application
- **Clear Instructions**: The application provides clear instructions if port mapping is not detected
- **Docker Compose Support**: Simplified container management

## Common Issues

If you see warnings about port mapping:
1. Stop the current container: `docker stop express-app`
2. Use one of the quick start options above
3. Access the application at http://localhost:3010
