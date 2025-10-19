import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {authRoutes} from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);


app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`);
});