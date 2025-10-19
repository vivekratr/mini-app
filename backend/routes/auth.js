import express from "express";
import bcrypt from 'bcrypt';
import { query } from '../config/database.js';
import { generateToken } from '../middleware/auth.js';


const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'username and password required' });
        }
        const result = await query(
            'SELECT id, username, password_hash, role FROM users WHERE username = $1',
            [username]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('login error:', error);
        res.status(500).json({ error: 'server error' });
    }

})


authRouter.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'username And password required' });
        }

        const existingUser = await query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const result = await query(
            'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role',
            [username, passwordHash, role || 'user']
        );

        const newUser = result.rows[0];

        res.status(201).json({
            message: 'user created successfully!!',
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default authRouter;