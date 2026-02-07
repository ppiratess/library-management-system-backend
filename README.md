# 📚 Library Management System

A backend-focused **Library Management System** built to practice and apply real-world backend concepts such as authentication, authorization, database design, and transactional operations.

---

## ✨ Features

- 👤 **User Management**
  - User registration and login
  - Role-based access control (Admin / User)

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Protected routes using Guards
  - Role-based permissions using custom `RolesGuard`

- 📖 **Book Management**
  - Add, update, delete, and list books
  - Admin-only access for book creation and deletion

- 📦 **Rental Management**
  - Rent books
  - Return books
  - Extend rental due dates
  - Rental status tracking (e.g. RENTED, RETURNED)

- 🧾 **Validation & Error Handling**
  - DTO-based request validation
  - Centralized exception handling

---

## 🛠 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Passport.js)
- **Validation:** class-validator / class-transformer

---

## 🗂 Project Structure (Simplified)

```
src/
├── auth/        # Authentication & authorization
├── users/       # User management
├── books/       # Book CRUD operations
├── rentals/     # Rental & return logic
├── prisma/      # Prisma schema & migrations
└── common/      # Guards, decorators, enums
```

---

## 🚀 Getting Started

You can run the project **either locally or using Docker**.

---

## 🐳 Setup Using Docker (Recommended)

### 1️⃣ Prerequisites

- Docker
- Docker Compose

### 2️⃣ Clone the repository

```bash
git clone <repo-url>
cd library-management
```

### 3️⃣ Environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/library
JWT_SECRET=your_jwt_secret
```

> `db` is the service name defined in `docker-compose.yml`

### 4️⃣ Run with Docker Compose

```bash
docker-compose up --build
```

This will:

- Start PostgreSQL
- Run Prisma migrations
- Start the NestJS application

### 5️⃣ Access the application

```
http://localhost:3000
```

---

## 🧑‍💻 Local Setup (Without Docker)

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Setup environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/library
JWT_SECRET=your_jwt_secret
```

### 3️⃣ Setup database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4️⃣ Run the application

```bash
npm run start:dev
```

Server will run at:

```
http://localhost:3000
```

---

## 🔑 Authentication Flow

1. User logs in using `/auth/login`
2. Server returns a JWT token
3. Token must be sent in headers:

```
Authorization: Bearer <token>
```

4. Guards validate token & user roles

---

## 🧪 API Testing

- Tested using **Postman**
- Supports query parameters for pagination & filtering

---

## 📌 Learning Goals

This project focuses on:

- Designing clean REST APIs
- Using Prisma effectively with transactions
- Understanding JWT authentication deeply
- Structuring NestJS applications properly
- Handling real-world edge cases

---

## 📈 Future Improvements

- Refresh token support
- Soft deletes
- Swagger API documentation
- Unit & integration tests
- Registration approvals for new users - students
