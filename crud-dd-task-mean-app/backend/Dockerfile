FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 8080

# Start backend
CMD ["node", "server.js"]
