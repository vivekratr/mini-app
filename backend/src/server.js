import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';
import productRouter from './routes/product.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);
app.use('/api/products', productRouter)


app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = (req, res) => {
    app(req, res);
  };

