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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Better Auth Test Project is running!' });
});
// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Better Auth Test Project',
        auth: {
            config: 'Check src/auth.ts for Better Auth configuration',
            studio: 'Run "npx better-auth studio" in this directory to open the studio'
        }
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Better Auth Test Project running on http://localhost:${PORT}`);
    console.log(`📊 Run "npx better-auth studio" to open the studio dashboard`);
    console.log(`🔐 Better Auth configuration in src/auth.ts`);
});
