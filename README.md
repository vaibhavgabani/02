# Express Application with Nodemon and CI/CD

A simple Express.js application with Nodemon for automatic server restart during development and CI/CD for automatic Docker image building.

## Installation

```bash
npm install
```

## Running the Application

### Local Development
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on http://localhost:3000 by default.

## Docker with CI/CD

This project uses GitHub Actions for CI/CD to automatically build and push Docker images to Docker Hub whenever code is pushed to the main branch.

### CI/CD Workflow

1. Make your code changes
2. Commit and push your changes to the main branch
3. GitHub Actions will automatically build and push a new Docker image to Docker Hub
4. Pull and run the updated image using docker-compose

### Running with Docker Compose

```bash
# Pull the latest Docker image and start the container
docker-compose pull && docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Manual Docker Commands

Pull the image from Docker Hub:
```bash
docker pull vaibhavgabani/express-app:latest
```

Run the container:
```bash
docker run -d -p 3010:3000 vaibhavgabani/express-app:latest
```

Access the application:
- Web interface: http://localhost:3010
- API endpoint: http://localhost:3010/api

### Building the Docker Image Locally (Not needed with CI/CD)

```bash
docker build -t express-app .
docker run -d -p 3010:3000 express-app
```

### Important Note
When running the Docker container, you **must** include the port mapping `-p 3010:3000` to access the application from your browser or API client.
