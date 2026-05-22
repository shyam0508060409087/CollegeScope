"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const colleges_1 = __importDefault(require("./routes/colleges"));
const compare_1 = __importDefault(require("./routes/compare"));
const auth_1 = __importDefault(require("./routes/auth"));
const saved_1 = __importDefault(require("./routes/saved"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
// Middlewares
app.use(express_1.default.json());
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim()) 
  : [];

app.use((0, cors_1.default)({
    origin: [...allowedOrigins, 'http://localhost:3000'],
    credentials: true,
}));
// Basic sanity check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Routes
app.use('/api/colleges', colleges_1.default);
app.use('/api/compare', compare_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/saved', saved_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 CollegeScope API Server running on port ${PORT}`);
});
