# ✅ NestJS Todo API

A modern, secure, and modular API built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and [Redis](https://redis.io/). It includes user registration, authentication with JWT access and refresh tokens, rate limiting, and Todo management.

---

## 🚀 Features

- 🔐 JWT-based authentication with refresh token rotation
- 🧵 Rate limiting with `@nestjs/throttler`
- 🧾 RESTful Todos CRUD
- 🔐 Password hashing with bcrypt
- 🛡️ Role-ready structure
- 💾 Prisma ORM + PostgreSQL (or any supported DB)
- ⚡ Redis integration (for sessions/throttling/etc.)

---

## 📦 Environment Setup

Create a `.env` file at the root with the following variables:

```env
# PostgreSQL or other supported database URI
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# JWT access token secret and expiration
JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=15m

# JWT refresh token secret and expiration
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d

# Redis URL (required for throttling or blacklisting)
REDIS_URL=redis://localhost:6379

# Allowed frontend origin for CORS
ORIGIN=http://localhost:5173
```

📝 You can copy `.env.example` to `.env` and customize it.

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/ThEWoLf882-42/todo-api
cd nestjs-todo-api

# Install dependencies
npm install

# Set up Prisma and generate client
npx prisma generate
npx prisma migrate dev --name init
```

---

## ▶️ Running the Server

```bash
npm run start:dev
```

Server will start at: [http://localhost:3000](http://localhost:3000)

---

## 📮 API Endpoints (via Postman)

| Method | Endpoint          | Description          | Auth Required           |
| ------ | ----------------- | -------------------- | ----------------------- |
| POST   | `/users/register` | Register new user    | ❌                      |
| POST   | `/auth/login`     | User login           | ❌                      |
| POST   | `/auth/refresh`   | Refresh access token | ✅ (with refresh token) |
| GET    | `/todos`          | Get user’s todos     | ✅                      |
| POST   | `/todos`          | Create new todo      | ✅                      |
| PATCH  | `/todos/:id`      | Update todo          | ✅                      |
| DELETE | `/todos/:id`      | Delete todo          | ✅                      |
| GET    | `/todos/stats`    | Get todo statistics  | ✅                      |

Import the Postman Collection from [`postman_collection.json`](./postman_collection.json)

---

## 🧪 Testing with Postman

- Register: `POST http://localhost:3000/users/register`
- Login: `POST http://localhost:3000/auth/login`
- Use `accessToken` as Bearer token in Authorization tab
- Refresh token: `POST http://localhost:3000/auth/refresh`

---

## 📁 Project Structure

```
src/
├── auth/
├── users/
├── todos/
├── redis/
├── prisma/
├── app.controller.ts
├── app.module.ts
└── main.ts
```

---

## 🧩 Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL (or MySQL, SQLite)
- Redis
- bcrypt, JWT
- Throttler (rate limiting)

---

## 🧑‍💻 Contributing

PRs welcome. Please follow code style and include tests.

---
