import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import collegesRouter from './routes/colleges';
import compareRouter from './routes/compare';
import authRouter from './routes/auth';
import savedRouter from './routes/saved';

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
  })
);

// Basic sanity check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use('/api/colleges', collegesRouter);
app.use('/api/compare', compareRouter);
app.use('/api/auth', authRouter);
app.use('/api/saved', savedRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CollegeScope API Server running on port ${PORT}`);
});
