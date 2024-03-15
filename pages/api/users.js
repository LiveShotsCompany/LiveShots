import pool from "./db.js";
import { comparePasswords } from "./auth.js";

export default async function handler(req, res) {
    try {
        const { method, body } = req;
        switch (method) {
            case 'GET':
                const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', ['daniel.r.gumbs@gmail.com']);
                res.status(200).json({password : rows[0].Id});
                break;
            case 'POST':
                const { e_mail, password } = body;

                const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [e_mail]);
                
                if (userRows.length !== 1) {
                    res.status(401).json({ message: 'Invalid email or password' });
                    return;
                }

                const user = userRows[0];
                
                // Compare passwords
                const passwordMatch = await comparePasswords(password, user.Password);
                
                if (passwordMatch !== true) {
                    res.status(401).json({passwordMatch: passwordMatch});
                }

                // Passwords match, login successful
                res.status(200).json('Login Succesfully');
                break;
            default:
                res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}