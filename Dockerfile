FROM node:18-alpine as prod

# Set the working directory
WORKDIR /app

ENV NODE_ENV=staging

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .

RUN npm run build

# Start the Nest.js application
# CMD ["node", "dist/src/main"]
CMD ["npm", "run", "start:staging"]

# Use the official Node.js image as the base image
FROM node:18-alpine as dev

# Set the working directory
WORKDIR /app

ENV NODE_ENV=development

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]


