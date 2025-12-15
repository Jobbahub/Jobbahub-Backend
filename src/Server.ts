import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import moduleRoutes from './routes/moduleRoutes.js';

const app = express();
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
app.use(express.json());

// 3. Routes
app.get('/', (req, res) => {
  res.send('Jobbahub API is running...');
});

app.use('/api/modules', moduleRoutes);

// 4. Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});