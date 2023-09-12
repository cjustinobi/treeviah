# Use the official Node.js image as the base image
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Use a lighter-weight base image for production
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Start the Nest.js application
# CMD ["node", "./dist/main.js"]
CMD ["npm", "run", "start:prod"]




# # Use the official Node.js image as the base image
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Copy the rest of the application code to the container
# COPY . .

# RUN npm run build

# # Start the Nest.js application
# CMD ["npm", "run", "start:dev"]
