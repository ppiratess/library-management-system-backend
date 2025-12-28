#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Path to the SQL file
SQL_FILE="prisma/seed-data/users.sql"

# Check if the file exists
if [ ! -f "$SQL_FILE" ]; then
  echo "Error: $SQL_FILE not found!"
  exit 1
fi

# Seed the database
echo "Seeding users from $SQL_FILE ..."
docker exec -i library_management_postgres psql -U postgres -d librarymanagement < "$SQL_FILE"

echo "Users seeded successfully!"
