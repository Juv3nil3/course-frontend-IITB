# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all the source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight Nginx server to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
