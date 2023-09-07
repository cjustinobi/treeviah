
# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

RUN npm run build

# Start the Nest.js application
CMD ["npm", "run", "start:dev"]
