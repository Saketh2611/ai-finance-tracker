#!/bin/bash

echo "Starting Docker Compose..."

# Optional: ensure docker is available
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Exiting..."
    exit 1
fi

if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose is not installed. Exiting..."
    exit 1
fi

# Build and start services
docker-compose up --build