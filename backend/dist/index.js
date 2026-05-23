"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));

dotenv_1.default.config();

const colleges_1 = __importDefault(require("./routes/colleges"));
const compare_1 = __importDefault(require("./routes/compare"));
const auth_1 = __importDefault(require("./routes/auth"));
const saved_1 = __importDefault(require("./routes/saved"));

const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;

// ── Build allowed origins list ──────────────────────────────────────────────
const allowedOrigins = [
    'http://localhost:3000',
    'https://college-scope-a4oi.vercel.app',  // your deployed frontend
    ...(process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
        : []),
];

// ── CORS must be first — before everything including express.json() ─────────
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// ── Handle preflight OPTIONS for ALL routes ─────────────────────────────────
app.options('*', (0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));

// ── Body parser after CORS ───────────────────────────────────────────────────
app.use(express_1.default.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use('/api/colleges', colleges_1.default);
app.use('/api/compare', compare_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/saved', saved_1.default);

app.listen(PORT, () => {
    console.log(`🚀 CollegeScope API running on port ${PORT}`);
});