#!/bin/bash

# Step 1: Stop the existing container first (if it is running)
echo "Stopping the container..."
docker stop web_container  # Stop the container (this is optional, as 'docker rm -f' also stops it)

# Step 2: Remove the existing container (will also stop it if it's running)
echo "Removing the container..."
docker rm -f web_container  # Force stop and remove the container

# Step 3: Remove the Docker image
echo "Removing the Docker image..."
docker rmi web-tech-image:latest  # Remove the image by container name or image ID

# Step 4: Remove all unused Docker images (optional)
# echo "Removing unused Docker images..."
# docker rmi $(docker images -f "dangling=true" -q)

# Step 5: Remove all stopped containers (optional cleanup step)
# echo "Removing stopped containers..."
# docker container prune -f

# Step 6: Build the Docker images again
echo "Building the Docker images..."
docker-compose build

# Step 7: Start the container with the updated build
echo "Starting the containers..."
docker-compose up -d

echo "Deployment complete!"

# Keep the terminal open
read -p "Press enter to exit..."
