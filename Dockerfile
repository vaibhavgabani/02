FROM node:18-alpine

# Add metadata labels
LABEL maintainer="Vaibhav Gabani"
LABEL description="Express.js API in Docker"
LABEL usage="docker run -d -p 3010:3000 vaibhavgabani/express-app:latest"
LABEL instructions="IMPORTANT: Use port mapping -p 3010:3000 when running this container"

WORKDIR /app

COPY package*.json ./

# Install dependencies including nodemon
RUN npm install

COPY . .

ENV PORT=3000

# Document both the internal port and recommended external port
EXPOSE 3000/tcp

# Use nodemon instead of node to run the application
CMD ["npm", "run", "dev"]
