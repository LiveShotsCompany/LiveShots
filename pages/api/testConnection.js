const pool = require("./db.js");

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM users");
    console.log("Rows:", rows);

    if (rows.length === 0 || rows[0].result === undefined) {
      console.log("Test query did not return the expected result.");
    } else {
      console.log("Database connection successful. Result:", rows[0].result);
    }

    connection.release();
  } catch (error) {
    console.error("Error connecting to database:", error);
  } finally {
    // Close the connection pool
    await pool.end();
  }
}

testConnection();
