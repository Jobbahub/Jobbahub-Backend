import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json()); // Add this line to parse JSON requests
const port = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

interface IKeuzemodule extends mongoose.Document {
  name: string;
  // Add other fields as necessary
}

const KeuzemoduleSchema = new mongoose.Schema<IKeuzemodule>({
  name: { type: String, required: true },
  // Define other fields here
});

const Keuzemodule = mongoose.model<IKeuzemodule>('Keuzemodule', KeuzemoduleSchema, 'Keuzemodules'); // 'Keuzemodules' is the collection name

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/keuzemodules', async (req, res) => {
  try {
    const keuzemodules = await Keuzemodule.find();
    res.json(keuzemodules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
