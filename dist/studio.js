"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startStudio = startStudio;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const ws_1 = require("ws");
const path_1 = require("path");
const open_1 = __importDefault(require("open"));
const chalk_1 = __importDefault(require("chalk"));
const routes_1 = require("./routes");
async function startStudio(options) {
    const { port, host, openBrowser, authConfig } = options;
    const app = (0, express_1.default)();
    const server = (0, http_1.createServer)(app);
    // CORS configuration
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', (ws) => {
        console.log(chalk_1.default.gray('🔌 WebSocket client connected'));
        const heartbeat = setInterval(() => {
            ws.ping();
        }, 30000);
        ws.on('close', () => {
            console.log(chalk_1.default.gray('🔌 WebSocket client disconnected'));
            clearInterval(heartbeat);
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            clearInterval(heartbeat);
        });
    });
    app.use((0, routes_1.createRoutes)(authConfig));
    app.use(express_1.default.static((0, path_1.join)(__dirname, '../public')));
    app.get('*', (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, '../public/index.html'));
    });
    server.listen(port, host, () => {
        const url = `http://${host}:${port}`;
        console.log(chalk_1.default.green('✅ Better Auth Studio is running!'));
        console.log(chalk_1.default.blue(`🌐 Dashboard: ${url}`));
        console.log(chalk_1.default.gray(`📊 API: ${url}/api`));
        console.log(chalk_1.default.gray(`🔌 WebSocket: ws://${host}:${port}`));
        console.log(chalk_1.default.yellow('\nPress Ctrl+C to stop the server\n'));
        if (openBrowser) {
            setTimeout(() => {
                (0, open_1.default)(url).catch(() => {
                    console.log(chalk_1.default.yellow('Could not open browser automatically. Please visit:'), url);
                });
            }, 1000);
        }
    });
    process.on('SIGINT', () => {
        console.log(chalk_1.default.yellow('\n🛑 Shutting down Better Auth Studio...'));
        server.close(() => {
            console.log(chalk_1.default.green('✅ Server stopped'));
            process.exit(0);
        });
    });
    return server;
}
//# sourceMappingURL=studio.js.map