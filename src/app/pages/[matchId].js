import React, { useEffect, useState } from "react";

const MatchDetails = ({ matchId }) => {
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      // Fetch match details based on matchId
      const response = await fetch(
        `http://livescore-api.com/api-client/fixtures/matches/${matchId}.json?key=Kb1vk8znJhYCmtZu&secret=IqUqUJzS5F203WRN8Tjs1SQLaPnwjm11`,
      );
      const data = await response.json();
      setMatchDetails(data.data.match);
    };

    fetchMatchDetails();
  }, [matchId]);

  if (!matchDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Match Details</h1>
      <p>Match ID: {matchDetails.id}</p>
      <p>Competition: {matchDetails.competition.name}</p>
      <p>Home Team: {matchDetails.home_name}</p>
      <p>Away Team: {matchDetails.away_name}</p>
      <p>Time: {matchDetails.time}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MatchDetails;
