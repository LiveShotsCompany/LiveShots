import pool from "./db";

export default async function handler(req, res) {
  try {
    const { method, body } = req;

    switch (method) {
      case "POST":
        const { matchId, userId } = body;

        // Check if the match is already favorited by the user
        const existingFavorite = await pool.query(
          "SELECT * FROM UserFavoriteMatches WHERE MatchID = ? AND UserID = ?",
          [matchId, userId],
        );

        if (existingFavorite[0].length > 0) {
          // If the match is already favorited, remove it
          await pool.query(
            "DELETE FROM UserFavoriteMatches WHERE MatchID = ? AND UserID = ?",
            [matchId, userId],
          );
          res.status(200).json({ isFavorite: false });
        } else {
          const matchDetails = await pool.query(
            "SELECT home_team, away_team FROM Matches WHERE ID = ?",
            [matchId],
          );

          const { home_team, away_team } = matchDetails[0][0];

          // Add the match to the user's favorite matches
          await pool.query(
            "INSERT INTO UserFavoriteMatches (UserID, MatchID, home_team, away_team) VALUES (?, ?, ?, ?)",
            [userId, matchId, home_team, away_team],
          );
          res.status(200).json({ isFavorite: true });
        }
        break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
