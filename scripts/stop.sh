#!/bin/bash

echo "🛑 Stopping Hostel Finder Application..."

# Stop and remove containers
docker-compose down

echo "✅ Application stopped successfully!"
