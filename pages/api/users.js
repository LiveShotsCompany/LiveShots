import pool from './db.js';

export default async function handler(req, res) {
    try {
        const { method, body } = req;
        switch (method) {
            case 'GET':
                const [rows] = await pool.query('SELECT * FROM users');
                res.status(200).json(rows);
                break;
            default:
                res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}