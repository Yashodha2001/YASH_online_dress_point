import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import notFound from './middleware/notFound.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Yash Online Dress Point API is running.' });
});

app.use('/api/products', productRoutes);
app.use(notFound);

export default app;
