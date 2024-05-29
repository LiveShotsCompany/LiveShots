// signup.js
import pool from "./db.js";
import { hashPassword } from "./auth.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { e_mail, password } = req.body;

    // Check if the email already exists
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [e_mail],
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);
    res.status(500).json({ hashedPassword });

    // Insert new user into the database
    await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      e_mail,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
