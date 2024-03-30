# Use Node.js LTS image as the base image
FROM node:lts-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use Node.js LTS image as the base image for the production stage
FROM node:lts-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the port that the application runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]

