# Library Management System

A backend-focused **Library Management System** built to practice and apply real-world backend concepts such as authentication, authorization, database design, and transactional operations.

---

## Features

- **User Management**
  - User registration and login
  - Role-based access control (Admin / User)

- **Authentication & Authorization**
  - JWT-based authentication
  - Protected routes using Guards
  - Role-based permissions using custom `RolesGuard`

- **Book Management**
  - Add, update, delete, and list books
  - Admin-only access for book creation and deletion

- **Rental Management**
  - Rent books
  - Return books
  - Extend rental due dates
  - Rental status tracking (e.g. RENTED, RETURNED)

- **Validation & Error Handling**
  - DTO-based request validation
  - Centralized exception handling

- **API Documentation**
  - Swagger UI enabled for API exploration

---

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Passport.js)
- **Validation:** class-validator / class-transformer

---

## Project Structure (Simplified)

```
src/
├── auth/        # Authentication & authorization
├── users/       # User management
├── books/       # Book CRUD operations
├── rentals/     # Rental & return logic
├── prisma/      # Prisma schema, migrations, and seed data
└── common/      # Guards, decorators, enums
```

---

## Getting Started

You can run the project **either locally or using Docker**.

---

## Setup Using Docker (Recommended)

### Prerequisites

- Docker
- Docker Compose

### Clone the repository

```bash
git clone <repo-url>
cd library-management
```

### Environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/library
JWT_SECRET=your_jwt_secret
```

> `db` is the service name defined in `docker-compose.yml`

### Run with Docker Compose

```bash
docker-compose up --build
# or
./start-docker.sh
```

`start-docker.sh` will:

- Start all Docker services
- Start the NestJS server
- Automatically follow logs using:

```bash
docker logs -f library_management_api
```

This improves local development DX by keeping server logs visible.

### Access the application

```
http://localhost:3000
```

---

## Database Seeding

### Seed users

A raw list of users is maintained in:

```
prisma/seed-data/
```

To seed users into the database, run:

```bash
./seed-user.sh
```

This script uses Prisma to populate the database with predefined users for local development and testing.

---

## Swagger API Documentation

Swagger is enabled for this project.

Once the server is running, access the Swagger UI at:

```
http://localhost:3000/api
```

Notes:

- APIs use raw JWTs (no `Bearer` prefix)
- If an endpoint requires authentication, provide the JWT accordingly (e.g. via headers or cookies, depending on the endpoint)

You can:

- Explore all available endpoints
- View request and response schemas
- Test APIs directly from the browser

---

## Local Setup (Without Docker)

### Install dependencies

```bash
npm install
```

### Setup environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/library
JWT_SECRET=your_jwt_secret
```

### Setup database

```bash
npx prisma migrate dev
npx prisma generate
```

### Run the application

```bash
npm run start:dev
```

Server will run at:

```
http://localhost:3000
```

---

## Authentication Flow

1. User logs in using `/auth/login`
2. Server returns a JWT
3. JWT is sent directly with requests (not using the `Bearer` scheme)

Example:

```
Authorization: <jwt>
```

4. Guards validate the JWT and user roles

---

## API Testing

- Tested using **Postman**
- Supports query parameters for pagination and filtering
- Swagger can also be used for manual testing

---

## Learning Goals

This project focuses on:

- Designing clean REST APIs
- Using Prisma effectively with transactions
- Understanding JWT authentication deeply
- Structuring NestJS applications properly
- Handling real-world edge cases

---

## Future Improvements

- Refresh token support
- Soft deletes
- Unit and integration tests
- Registration approvals for new users (students)
