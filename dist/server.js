import express, {} from 'express';
import mongoose from 'mongoose';
// ... andere imports
// Importeer de routes
import moduleRoutes from './routes/moduleRoutes.js';
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const mongoUri = process.env.DATABASE_URL || 'mongodb+srv://Test:Test@testavans.jege5jk.mongodb.net/Jobbahub';
// Database verbinding
mongoose.connect(mongoUri)
    .then(() => console.log('Database verbonden!'))
    .catch(err => console.error('Database verbindingsfout:', err));
// Middleware
app.use(express.json()); // Voor het parsen van JSON bodies
// Route Registratie
// Gebruik een basispad zoals '/api/modules' voor alle module-gerelateerde routes
app.use('/api/modules', moduleRoutes);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Jobbahub API!');
});
// Start de server
app.listen(port, () => {
    console.log(`⚡️ [server]: Server draait op http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map