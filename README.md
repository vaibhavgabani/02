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
4. Run the application using the simple script provided (no manual configuration needed)

### Easy Way to Run (Recommended)

For Windows users:
```bash
# Simply run the provided PowerShell script
.\run-app.ps1
```

For Mac/Linux users:
```bash
# Make the script executable
chmod +x run-app.sh
# Run the script
./run-app.sh
```

The script will automatically:
- Pull the latest image
- Handle port mapping
- Start the container
- Open your browser to the application

### Running with Docker Compose

```bash
# Pull the latest Docker image and start the container
docker-compose up -d
```

Docker Compose will automatically handle:
- Pulling the latest image
- Port mapping
- Container configuration

### Manual Docker Commands (Not recommended)

If you prefer to run commands manually:

```bash
# Pull the image
docker pull vaibhavgabani/express-app:latest

# Run the container with automatic port mapping
docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest
```

Access the application:
- Web interface: http://localhost:3010
- API endpoint: http://localhost:3010/api

## Troubleshooting

If you're experiencing issues accessing the application after pulling and running the Docker image, try these steps:

1. **Use the provided scripts**: The easiest way is to use the `run-app.ps1` (Windows) or `run-app.sh` (Mac/Linux) scripts that handle everything automatically.

2. **Check if port 3010 is in use**: If another application is using port 3010, try a different port:
   ```bash
   docker run -d -p 8080:3000 vaibhavgabani/express-app:latest
   ```
   Then access at http://localhost:8080

3. **Check firewall settings**: Make sure your firewall allows connections to the port you're using.

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
