#!/usr/bin/env bash

set -e

echo "🚀 Starting Library Management System (detached mode)..."

# Check Docker
if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker is not running"
  exit 1
fi

# Detect compose command
if command -v docker compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  COMPOSE_CMD="docker-compose"
fi

# Start services in detached mode
$COMPOSE_CMD up -d --build

echo "✅ Services started in detached mode"
echo "📡 Attaching to API logs..."
echo "----------------------------------"

# Follow Nest API logs
docker logs -f library_management_api
