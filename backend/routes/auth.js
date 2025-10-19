import express from "express";
import bcrypt from 'bcrypt';
import { query } from '../config/database.js';


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


export default authRouter;