FROM node:18-alpine

# Add metadata labels
LABEL maintainer="Vaibhav Gabani"
LABEL description="Express.js API in Docker"
LABEL version="1.0"
LABEL com.docker.compose.project="express-app"

WORKDIR /app

# First copy only package files to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy the rest of the application
COPY . .

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=development
# This is crucial - ensures the app binds to all network interfaces
ENV HOST="0.0.0.0"

# Document the port the app runs on - EXPOSE command is informational only
# The actual port publishing happens at runtime with docker run -p or in docker-compose
EXPOSE 3000

# Add healthcheck to ensure application is running correctly
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Use nodemon instead of node for automatic reloading
CMD ["npm", "run", "dev"]
