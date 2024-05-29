import pool from "./db";

export default async function handler(req, res) {
    try {
        const { method, body } = req;

        switch (method) {
            case "POST":
                const { userId } = body;
                const favoriteRows = await pool.query("SELECT UserFavoriteMatches.*, Matches.Date, Matches.Time FROM UserFavoriteMatches INNER JOIN Matches ON UserFavoriteMatches.MatchID = Matches.ID WHERE UserFavoriteMatches.UserID = ?", [userId]);
                
                console.log(favoriteRows)
                
                const userFavoriteMatches = favoriteRows[0].map(row => ({
                    userId: row.UserID,
                    Id: row.MatchID,
                    homeTeam: row.home_team,
                    awayTeam: row.away_team,
                    date: row.Date,
                    time: row.Time
                }));

                console.log(userFavoriteMatches);

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
