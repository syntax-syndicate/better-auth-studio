import express from 'express';
import { auth } from './auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Better Auth Test Project Running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Better Auth Test Project',
    description: 'This is a test project for Better Auth Studio',
    endpoints: {
      health: '/health',
      auth: '/api/auth/*'
    }
  });
});

// Better Auth routes
app.use('/api/auth', auth);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Better Auth Test Project running on http://localhost:${PORT}`);
});
