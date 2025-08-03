# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port (change if your server uses a different port)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
