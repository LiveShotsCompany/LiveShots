import pool from "./db.js";

export default async function handler(req, res) {
  try {
    const { method, body } = req;

    switch (method) {
      case "POST":
        const { matchId, homeTeam, awayTeam, userId } = body;
        await pool.query(
          "INSERT INTO UserFavoriteMatches (userId, matchId, home_team, away_team) VALUES (?, ?, ?, ?)",
          [userId, matchId, homeTeam, awayTeam],
        );

        res.status(200).json({ message: "Match favorited" });
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
