import express from 'express';
import cors from 'cors';
import path from 'path';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


app.listen((process.env.PORT || 8080), () => {
    console.log(`Server is running on port ${PORT}`);
});