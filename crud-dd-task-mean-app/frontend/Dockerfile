# Stage 1: Build Angular app
FROM node:18-alpine AS builder
WORKDIR /app

# Install Angular CLI globally (optional)
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install
COPY . .

# Build Angular app in production mode (new syntax)
RUN ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
