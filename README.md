# CollegeScope — Decoupled Split-Stack Architecture

Welcome to **CollegeScope**, a premium college discovery and comparison web application designed for students in India.

This project is built using a modern decoupled architecture, splitting the user interface (frontend) and the database-driven business logic (backend) into two fully independent directories.

---

## 📂 Project Structure

```text
IntProject/
├── frontend/                        ← Next.js User Interface (deployed to Vercel)
│   ├── app/                         (UI routes, comparison pages, details view)
│   ├── components/                  (reusable React/TypeScript layout elements)
│   ├── lib/                         (Zustand stores, Auth configurations, utility helpers)
│   ├── package.json                 (Next.js dependencies only — Prisma/DB completely removed)
│   └── .env.example                 (Pre-configured frontend environment values)
│
└── backend/                         ← Express.js REST API Server (deployed to Render/Railway)
    ├── src/
    │   ├── index.ts                 (Express server configuration, CORS initialization)
    │   ├── routes/                  (REST endpoints: colleges, comparison, saved, auth)
    │   ├── middleware/              (JWT Authenticator)
    │   └── lib/                     (Prisma client instance provider)
    ├── prisma/                      (Schema definition, seed script, local SQLite DB)
    ├── package.json                 (Express server package + Prisma ORM)
    └── .env.example                 (Pre-configured backend environment values)
```

---

## 🚀 Quick Start (Local Development)

To run both services locally, follow these steps:

### 1. Start the Backend API Server
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Copy the example environment file and install dependencies:
   ```bash
   cp .env.example .env
   npm install
   ```
3. Initialize the Prisma Client and local SQLite database:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will boot up on **[http://localhost:5000](http://localhost:5000)***.

### 2. Start the Frontend Application
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Copy the example environment file and install dependencies:
   ```bash
   cp .env.example .env
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend client will run on **[http://localhost:3000](http://localhost:3000)***.

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | Server sanity check | No |
| **GET** | `/api/colleges` | Paginated search, sorting, filtering of colleges | No |
| **GET** | `/api/colleges/:slug` | Retrieve single college details with courses & reviews | No |
| **POST** | `/api/compare` | Compare up to 3 colleges side-by-side | No |
| **POST** | `/api/auth/signup` | Register a new user | No |
| **POST** | `/api/auth/login` | Authenticate credentials and return JWT token | No |
| **GET** | `/api/saved` | Fetch saved colleges and comparisons | Yes (JWT) |
| **POST** | `/api/saved` | Save a college or a comparison | Yes (JWT) |
| **DELETE** | `/api/saved/:collegeId` | Remove a college from saved | Yes (JWT) |

---

## 🌐 Production Deployment

### Frontend (`frontend/`) -> Vercel
1. Set the root directory to `frontend` in your Vercel project settings.
2. Add the following environment variables:
   * `NEXT_PUBLIC_API_URL`: Your live backend URL (e.g., `https://your-backend.onrender.com`).
   * `NEXTAUTH_SECRET`: A secure random cryptographic key.
   * `NEXTAUTH_URL`: Your live frontend URL (e.g., `https://your-project.vercel.app`).

### Backend (`backend/`) -> Render / Railway
1. Set the root directory to `backend` in your hosting dashboard.
2. Build command: `npm install && npm run build` (runs `prisma generate && tsc`).
3. Start command: `npm run start` (runs `node dist/index.js`).
4. Add the following environment variables:
   * `DATABASE_URL`: Your production database URL (e.g., PostgreSQL).
   * `JWT_SECRET`: A secure key used for signing user tokens.
   * `FRONTEND_URL`: Your live frontend URL.
