import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'peace';

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '14d' }
    );
};
  
exports = {
    generateToken,
    JWT_SECRET
  };