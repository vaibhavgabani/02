# Docker Instructions for Express API

This document provides comprehensive instructions for running the Express API using Docker.

## Quick Start

```bash
# Pull the image from Docker Hub
docker pull vaibhavgabani/express-app:latest

# Run the container with port mapping (REQUIRED)
docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest

# Access the application
# Web interface: http://localhost:3010
# API endpoint: http://localhost:3010/api
```

## Container Details

- **Base Image**: Node 18 Alpine
- **Exposed Port**: 3000 (internal)
- **Recommended Host Port**: 3010
- **Environment Variables**: 
  - `PORT=3000` (default)
  - `HOST=0.0.0.0` (binds to all network interfaces)
  - `NODE_ENV=development`

## Port Mapping Explained

Docker containers have their own isolated network. To access the application from your host machine:

1. The container exposes port 3000 internally
2. You must map this to a port on your host machine
3. The `-p 3010:3000` flag maps host port 3010 to container port 3000

Without this port mapping, the application will run but will not be accessible.

## Common Issues and Solutions

### Can't Access the Application

If you see "Hmmm… can't reach this page" or "Connection refused" errors:

1. **Check port mapping**: Always use the `-p 3010:3000` flag when running
2. **Verify container is running**: `docker ps` should show your container
3. **Check container logs**: `docker logs express-app`

### Using a Different Port

If port 3010 is already in use on your host:

```bash
docker run -d -p 8080:3000 --name express-app vaibhavgabani/express-app:latest
```
Then access at http://localhost:8080

## Docker Compose

For easier management, use Docker Compose:

```yaml
# docker-compose.yml
services:
  app:
    image: vaibhavgabani/express-app:latest
    ports:
      - "3010:3000"
    restart: always
```

Run with:
```bash
docker-compose up -d
```

## Building from Source

If you prefer to build the Docker image yourself:

```bash
# Clone repository
git clone https://github.com/yourusername/express-app.git
cd express-app

# Build the image
docker build -t express-app .

# Run the container
docker run -d -p 3010:3000 express-app
```

## Advanced Usage

### Persistent Containers

To make the container restart automatically:

```bash
docker run -d -p 3010:3000 --restart always --name express-app vaibhavgabani/express-app:latest
```

### Environment Variables

You can override default environment variables:

```bash
docker run -d -p 3010:3000 -e "PORT=3000" -e "NODE_ENV=production" --name express-app vaibhavgabani/express-app:latest
```

### Volume Mounts

For development, you can mount your local code into the container:

```bash
docker run -d -p 3010:3000 -v $(pwd)/src:/app/src --name express-app vaibhavgabani/express-app:latest
```
