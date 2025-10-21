import express from "express";
import { query } from '../config/database.js';

const contentRouter = express.Router();

contentRouter.get('/:page', async (req, res) => {
    try {
        const { page } = req.params;
        const language = req.query.language || 'en';

        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        const validPages = ['login', 'terms', 'navbar', 'footer'];
        if (!validPages.includes(page)) {
            return res.status(400).json({ error: 'Invalid page requested' });
        }

        const result = await query(
            'SELECT text FROM content WHERE page = $1 AND language = $2',
            [page, language]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Content not found' });
        }

        const content = result.rows[0].text;

        if (page === 'login') {
            try {
                res.json({ content: JSON.parse(content) });
            } catch (e) {
                res.json({ content });
            }
        } else {
            res.json({ content });
        }

    } catch (error) {
        console.error('Content fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default contentRouter;