import pool from "./db.js";

export default async function handler(req, res) {
    try {
        const { method } = req;
        switch (method) {
            case "GET":
                const query = `
                    SELECT
                        m.Id,
                        m.CompetitionId,
                        c.Name AS CompetitionName,
                        m.Date,
                        m.Time,
                        GROUP_CONCAT(t.id) AS team_ids,
                        GROUP_CONCAT(t.name) AS team_names
                    FROM
                        Matches AS m
                            INNER JOIN
                        TeamMatches AS tm ON m.Id = tm.MatchId
                            INNER JOIN
                        Teams AS t ON tm.TeamId = t.id
                            INNER JOIN
                        Competitions AS c ON m.CompetitionId = c.Id
                    GROUP BY
                        m.Id;
                `;
                const [rows] = await pool.query(query);

                const matchesByLeague = {};

                rows.forEach(row => {
                    const match = {
                        id: row.Id,
                        competitionId: row.CompetitionId,
                        competitionName: row.CompetitionName,
                        date: row.Date,
                        time: row.Time,
                        teams: row.team_ids.split(',').map((id, index) => ({
                            id: parseInt(id),
                            name: row.team_names.split(',')[index]
                        }))
                    };

                    if (!matchesByLeague[row.CompetitionId]) {
                        matchesByLeague[row.CompetitionId] = [];
                    }
                    matchesByLeague[row.CompetitionId].push(match);
                });

                res.status(200).json(matchesByLeague);
                break;
            default:
                res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
