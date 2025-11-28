# Stage 1: Build Angular app
FROM node:18-alpine AS builder

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build Angular app in production mode
RUN ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output from builder stage
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
