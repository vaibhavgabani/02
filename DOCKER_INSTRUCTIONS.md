# Docker Instructions for Express API

This document provides comprehensive instructions for running the Express API using Docker.

## Quick Start

```bash
# Pull the image from Docker Hub
docker pull vaibhavgabani/express-app:latest

# Run the container with port mapping
docker run -d -p 3010:3000 vaibhavgabani/express-app:latest

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

## Common Issues and Solutions

### Can't Access the Application

If you see "Hmmm… can't reach this page" or "Connection refused" errors:

1. **Check port mapping**: Always use the `-p 3010:3000` flag when running
2. **Verify container is running**: `docker ps` should show your container
3. **Check container logs**: `docker logs [container_id]`

### Example docker-compose.yml

```yaml
version: '3'
services:
  app:
    image: vaibhavgabani/express-app:latest
    ports:
      - "3010:3000"
    restart: always
```

## Advanced Usage

### Building from source

```bash
git clone https://github.com/yourusername/express-app.git
cd express-app
docker build -t express-app .
docker run -d -p 3010:3000 express-app
```

### Using a Different Port

```bash
docker run -d -p 8080:3000 vaibhavgabani/express-app:latest
```
Then access at http://localhost:8080
