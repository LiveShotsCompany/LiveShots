const express = require("express");
const next = require("next");
const axios = require("axios");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get("/api/standings/:leagueId", async (req, res) => {
    try {
      const { leagueId } = req.params;
      const response = await axios.get(
        `https://api.openligadb.de/getbltable/${leagueId}/2023`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );

      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Custom route for available leagues
  server.get("/api/leagues", async (req, res) => {
    try {
      // Fetch and return the list of available leagues
      const response = await axios.get(
        "https://api.openligadb.de/getavailableleagues",
      );
      const leaguesData = response.data;
      res.json(leaguesData);
    } catch (error) {
      console.error("Error fetching available leagues:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Default route, handle Next.js pages
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
