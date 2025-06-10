#!/bin/bash

echo "🚀 Starting Hostel Finder Application..."

# Build and start containers
docker-compose up --build -d

echo "✅ Application started successfully!"
echo "📱 App: http://localhost:3000"
echo "🗄️  MySQL: localhost:3306"
echo ""
echo "To stop: docker-compose down"
echo "To view logs: docker-compose logs -f"
