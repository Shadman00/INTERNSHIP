# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Run Angular in development/watch mode
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
