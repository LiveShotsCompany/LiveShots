import pool from "./db";

export default async function handler(req, res) {
  try {
    const { method, body } = req;
    const { userId } = body;

    switch (method) {
      case "POST":
        const rows = await pool.query(
          "SELECT matchId FROM UserFavoriteMatches WHERE userId = ?",
          [userId],
        );

        const favoriteMatches = rows.flatMap((row) =>
          row.map((entry) => entry.matchId),
        );

        res.status(200).json({ favoriteMatches });
        break;
      case "GET":
        const favoriteRows = await pool.query(
          "SELECT UserFavoriteMatches.*, Matches.Date, Matches.Time FROM UserFavoriteMatches INNER JOIN Matches ON UserFavoriteMatches.MatchID = Matches.ID WHERE UserFavoriteMatches.UserID ?",
          [userId],
        );

        const userFavoriteMatches = favoriteRows.map((row) => ({
          matchId: row.matchId,
          leagueId: row.leagueId,
          matchName: row.matchName,
          date: row.date,
        }));

        res.status(200).json({ userFavoriteMatches });
        break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
