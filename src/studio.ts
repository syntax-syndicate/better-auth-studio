import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { join } from 'path';
import open from 'open';
import chalk from 'chalk';
import { createRoutes } from './routes';
import { AuthConfig } from './config';

interface StudioOptions {
  port: number;
  host: string;
  openBrowser: boolean;
  authConfig: AuthConfig;
}

export async function startStudio(options: StudioOptions) {
  const { port, host, openBrowser, authConfig } = options;
  const app = express();
  const server = createServer(app);

  // CORS configuration
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server });
  
  wss.on('connection', (ws) => {
    console.log(chalk.gray('🔌 WebSocket client connected'));
    
    // Send heartbeat every 30 seconds
    const heartbeat = setInterval(() => {
      ws.ping();
    }, 30000);

    ws.on('close', () => {
      console.log(chalk.gray('🔌 WebSocket client disconnected'));
      clearInterval(heartbeat);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clearInterval(heartbeat);
    });
  });

  // API routes
  app.use(createRoutes(authConfig));

  // Serve static files from the frontend build
  app.use(express.static(join(__dirname, '../public')));

  // Catch-all route to serve the React app
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
  });

  // Start the server
  server.listen(port, host, () => {
    const url = `http://${host}:${port}`;
    console.log(chalk.green('✅ Better Auth Studio is running!'));
    console.log(chalk.blue(`🌐 Dashboard: ${url}`));
    console.log(chalk.gray(`📊 API: ${url}/api`));
    console.log(chalk.gray(`🔌 WebSocket: ws://${host}:${port}`));
    console.log(chalk.yellow('\nPress Ctrl+C to stop the server\n'));

    // Open browser if requested
    if (openBrowser) {
      setTimeout(() => {
        open(url).catch(() => {
          console.log(chalk.yellow('Could not open browser automatically. Please visit:'), url);
        });
      }, 1000);
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n🛑 Shutting down Better Auth Studio...'));
    server.close(() => {
      console.log(chalk.green('✅ Server stopped'));
      process.exit(0);
    });
  });

  return server;
}
