# CollegeScope — Next.js Frontend Application

This is the frontend user interface for the CollegeScope application, built with Next.js (App Router), Tailwind CSS, Lucide icons, and Recharts.

## 🛠️ Tech Stack
- **Framework**: Next.js 14
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts

## 🚀 Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure you have your `.env` configured:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   NEXTAUTH_SECRET="your-secret-key-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 🧪 Production Build
To build and check compilation:
```bash
npm run build
```
This generates the optimized production build.

To start the built production server:
```bash
npm start
```
