# 📝 Todo API Backend

This is a secure, production-ready RESTful API for a **Todo application** built using **NestJS**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Redis**, designed for authentication, performance, and scalability.

---

## 🚀 Features

- ✅ User Registration and Authentication (JWT + Refresh Tokens)
- ✅ Secure Todo CRUD with Filtering, Pagination & Statistics
- ✅ Redis Caching for performance (todo stats)
- ✅ Global Rate Limiting (Throttler)
- ✅ Validation, Sanitization, Helmet, and CORS protection
- ✅ Full Swagger API documentation

---

## ⚙️ Tech Stack

| Layer     | Technology        |
| --------- | ----------------- |
| Framework | NestJS            |
| Language  | TypeScript        |
| ORM       | Prisma            |
| DB        | PostgreSQL        |
| Cache     | Redis             |
| Auth      | JWT               |
| Testing   | Jest              |
| Docs      | Swagger (OpenAPI) |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env` file

```env
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
JWT_SECRET=your_access_secret
JWT_EXPIRES_IN=access_secret_expiration
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=refresh_secret_expiration
REDIS_URL=redis://localhost:6379
ORIGIN=http://localhost:4200
```

### 4. Setup PostgreSQL & Prisma

```bash
npx prisma migrate dev --name init
```

---

## 🧪 Testing

Run all unit and integration tests:

```bash
npm run test
```

Generate test coverage report:

```bash
npm run test:cov
```

---

## 📚 API Documentation

After starting the server, visit:

```
http://localhost:3000/docs
```

Interactive Swagger documentation is available there.

---

## 📦 Scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `npm run start`    | Start development server      |
| `npm run test`     | Run tests                     |
| `npm run test:cov` | Generate test coverage report |
| `npm run build`    | Build the app for production  |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and open a pull request.
