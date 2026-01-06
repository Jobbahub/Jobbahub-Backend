import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors'; // Vergeet niet: npm install cors & @types/cors
import moduleRoutes from './routes/moduleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();
app.use(helmet());
const port = process.env.PORT || 3000;

// 1. Database Connectie
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB: Jobbahub'))
  .catch(err => console.error('❌ Could not connect to MongoDB', err));

// 2. Middleware
app.use(cors()); // Zorgt dat frontend bij de API kan
app.use(express.json());

// 3. Routes
app.get('/', (req, res) => {
  res.send('Jobbahub API is running...');
});

app.post('/test-register', (req, res) => {
  res.json({ received: req.body });
});

app.use('/api/modules', moduleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/ai', aiRoutes); // Dynamische import voor AI-routes

// 4. Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});