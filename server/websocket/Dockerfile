
# Dockerfile for ws-server.js (WebSocket Server)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the WebSocket port (default 4001, can be overridden)
EXPOSE 4001

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production
ENV CORS_ORIGIN=*

# Start the WebSocket server
CMD ["node", "ws-server.js"]
