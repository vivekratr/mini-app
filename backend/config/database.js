const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
    console.log('Database connected successfully');
});
pool.on('error', (err) => {
    console.error(' database error:', err);
    process.exit(-1);
});

const query = async (text, param) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, param);
        const duration = Date.now() - start;
        console.log(' query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('query error:', error);
        throw error;
    }
};
  