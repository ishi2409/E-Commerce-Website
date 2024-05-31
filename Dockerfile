# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install --prefix ./frontend

# Install backend dependencies
RUN npm install --prefix ./backend

# Copy the React build folder to the working directory
COPY frontend/build ./frontend/build

# Copy your Node.js server code to the working directory
COPY backend/ ./backend/

# Expose the port your Node.js app runs on
ENV PORT=4000
EXPOSE $PORT

# Start the Node.js server
CMD ["node", "backend/server.js"]