# MEAN Stack Docker Deployment Guide

This README provides **full, production-ready Docker instructions** for your MEAN (MongoDB, Express, Angular, Node.js) project. It includes:

1 Frontend Dockerfile (Angular + Nginx)
2 Backend Dockerfile (Node/Express)
3 Commands to build and run containers
4 Folder structure guidance



# Project Structure


crud-dd-task-mean-app/
  frontend/
    package.json
    angular.json
    src/
  backend/
    package.json
    server.js (or app.js)
  docker-compose.yml  (optional)


##! Frontend Dockerfile (Angular + Nginx)

Create the file:

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








## 2 Backend Dockerfile (Node/Express)

Create:

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

backend/Dockerfile


#  Commands to Build & Run the Containers

##  Build the Angular Frontend Image

`
cd frontend
docker build -t my-frontend .


Run it:

commnad-->
docker run -d -p 80:80 my-frontend




##  Build the Express Backend Image


cd backend
docker build -t my-backend .


Run it:

commnad-->
docker run -d -p 3000:3000 my-backend
```



#  docker-compose.yml

Create at project root:

version: "3.8"

services:
  # ---------- MongoDB ----------
  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: meandb
    volumes:
      - mongodb_data:/data/db
    networks:
      - mean-network

  # ---------- Backend ----------
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: backend
    restart: always
    ports:
      - "8080:8080"
    environment:
      - MONGODB_URI=mongodb://admin:password123@mongodb:27017/meandb?authSource=admin
      - PORT=8080
      - NODE_ENV=production
    depends_on:
      - mongodb
    networks:
      - mean-network

  # ---------- Frontend ----------
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - mean-network

volumes:
  mongodb_data:

networks:
  mean-network:
    driver: bridge


Run everything:

Command 

d
```

---

# 1. Frontend Dockerfile (Angular + Nginx)

Create the file:

```
frontend/Dockerfile
```
Create the file:

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
---

# 2. Backend Dockerfile (Node/Express)

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

```

---

# 3. Commands to Build & Run Locally

Build Angular frontend:

```
cd frontend
docker build -t my-frontend .
docker run -d -p 80:80 my-frontend
```

Build Express backend:

```
cd backend
docker build -t my-backend .
docker run -d -p 3000:3000 my-backend
```

---

# 4. Optional: docker-compose.yml

version: "3.8"

services:
  # ---------- MongoDB ----------
  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: meandb
    volumes:
      - mongodb_data:/data/db
    networks:
      - mean-network

  # ---------- Backend ----------
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: backend
    restart: always
    ports:
      - "8080:8080"
    environment:
      - MONGODB_URI=mongodb://admin:password123@mongodb:27017/meandb?authSource=admin
      - PORT=8080
      - NODE_ENV=production
    depends_on:
      - mongodb
    networks:
      - mean-network

  # ---------- Frontend ----------
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - mean-network

volumes:
  mongodb_data:

networks:
  mean-network:
    driver: bridge
Run everything:

COMMAND -->
docker compose up -d --build


# 5. Cloud VM Deployment Using SSH

## 1. Install Docker and Docker Compose on the VM

Run these commands on your Ubuntu VM:

sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Allow current user to run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose v2
sudo apt install docker-compose-plugin -y


## 2. Clone Your GitHub Repository

```
cd ~
git clone https://github.com/Shadman00/INTERNSHIP.git
cd INTERNSHIP
```





## 3. Start the Application Using Docker Compose


docker compose up -d



## 4. Verify Containers Are Running

COMMAND-->
docker compose ps`

<img width="886" height="176" alt="image" src="https://github.com/user-attachments/assets/6411b0cb-eb39-4a6a-8eb3-53fd16f9effb" />



frontend   running   0.0.0.0:80->80
backend    running   0.0.0.0:8080->8080
mongodb    running   0.0.0.0:27017->27017


## 6. Test the Deployment

Frontend:


http://45.79.220.251/tutorials
```

Backend:

```
http://45.79.220.251:8080/

```

API test:

```
http://45.79.220.251/:8080/api
```

https://drive.google.com/drive/folders/1PYLYI5q4pUZOXD6Pb7jDVn1hEOxWPnTy?usp=sharing





