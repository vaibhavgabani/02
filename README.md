# Express Application with Nodemon

A simple Express.js application with Nodemon for automatic server restart during development.

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

## Docker

### Running with Docker

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

### Building the Docker Image Locally

```bash
docker build -t express-app .
docker run -d -p 3010:3000 express-app
```

### Important Note
When running the Docker container, you **must** include the port mapping `-p 3010:3000` to access the application from your browser or API client.
