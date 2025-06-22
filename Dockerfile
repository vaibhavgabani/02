FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies including nodemon
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

# Use nodemon instead of node to run the application
CMD ["npm", "run", "dev"]
