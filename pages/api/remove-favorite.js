import pool from "./db.js";

export default async function handler(req, res) {
  try {
    const { method, body } = req;

    switch (method) {
      case "POST":
        const { matchId, userId } = body;

        // Check if the user has already favorited the match
        const existingFavorite = await pool.query(
          "SELECT * FROM UserFavoriteMatches WHERE userId = ? AND matchId = ?",
          [userId, matchId],
        );

        if (existingFavorite.length === 0) {
          return res
            .status(404)
            .json({ message: "Match not found in favorites" });
        }

        // Remove the match from user's favorites
        await pool.query(
          "DELETE FROM UserFavoriteMatches WHERE userId = ? AND matchId = ?",
          [userId, matchId],
        );

        res.status(200).json({ message: "Match removed from favorites" });
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
