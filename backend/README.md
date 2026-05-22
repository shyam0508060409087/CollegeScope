# CollegeScope — Express.js API Server

This is the backend API server for the CollegeScope application. It handles user authentication (via JWT), search/filtering queries, side-by-side college comparisons, and saved list storage.

## 🛠️ Tech Stack
- **Runtime**: Node.js + TypeScript
- **Server Framework**: Express.js
- **Database ORM**: Prisma (configured with SQLite for development, compatible with PostgreSQL for production)
- **Security**: jsonwebtoken, bcryptjs, cors

## 🚀 Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure you have your `.env` configured:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-key"
   PORT=5000
   FRONTEND_URL="http://localhost:3000"
   ```

3. Setup your database:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## 🧪 Production Build
To build and check TypeScript compilation:
```bash
npm run build
```
This generates compiled JavaScript under the `dist/` directory.

To start the production server:
```bash
npm start
```
