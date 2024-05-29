import pool from "./db";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
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
            t.id AS TeamId,
            t.name AS TeamName,
            GROUP_CONCAT(DISTINCT p.id) AS PlayerIds,
            GROUP_CONCAT(DISTINCT p.name) AS PlayerNames
          FROM
            Matches AS m
              INNER JOIN TeamMatches AS tm ON m.Id = tm.MatchId
              INNER JOIN Teams AS t ON tm.TeamId = t.id
              INNER JOIN Competitions AS c ON m.CompetitionId = c.Id
              INNER JOIN TeamMatches AS ptm ON t.id = ptm.TeamId
              INNER JOIN Players AS p ON ptm.TeamId = p.TeamId
          WHERE
            m.Id = ?
          GROUP BY
            t.id, t.name;
        `;
        const [rows] = await pool.query(query, [id]);
        console.log(rows);

        if (rows.length === 0) {
          return res.status(404).json({ message: "Match not found" });
        }

        const matchDetails = {
          id: rows[0].Id,
          competitionId: rows[0].CompetitionId,
          competitionName: rows[0].CompetitionName,
          date: rows[0].Date,
          time: rows[0].Time,
          teams: rows.map((row) => ({
            id: row.TeamId,
            name: row.TeamName,
            players: row.PlayerIds.split(",").map((playerId, playerIndex) => ({
              id: parseInt(playerId),
              name: row.PlayerNames.split(",")[playerIndex],
            })),
          })),
        };

        console.log(matchDetails);

        res.status(200).json(matchDetails);
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
