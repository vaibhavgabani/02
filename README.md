# Express Application with Docker

A simple Express.js application with Docker containerization and Nodemon for automatic server restart during development.

## Features

- Express.js REST API
- Docker containerization
- Nodemon for auto-reloading during development
- CI/CD with GitHub Actions

## Installation

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

The server will run on http://localhost:3000 by default.

## Docker Deployment

### Important: Port Mapping

When running this application in Docker, you **must** map the container port (3000) to a host port to access the application.

### Running with Docker

```bash
# Pull the image from Docker Hub
docker pull vaibhavgabani/express-app:latest

# Run with port mapping (required)
docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest
```

Access the application:
- Web interface: http://localhost:3010
- API endpoint: http://localhost:3010/api

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

## API Endpoints

- `GET /` - HTML welcome page
- `GET /api` - JSON response with API information

## Project Structure

```
express-app/
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker image configuration
├── nodemon.json          # Nodemon configuration
├── package.json          # Project dependencies
└── src/
    └── index.js          # Main application code
```

## Docker Configuration

For detailed Docker setup instructions, see [DOCKER_INSTRUCTIONS.md](DOCKER_INSTRUCTIONS.md).

## License

MIT

4. **Verify Docker is running**: Make sure the Docker service is running on your machine.

5. **Check container logs**:
   ```bash
   docker logs express-app
   ```
host:3000 by default.
running on your machine.

5. **Check container logs**:
   ```bash
   docker logs express-app
   ```
