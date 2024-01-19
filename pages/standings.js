import React, { useEffect, useState } from "react";
import axios from "axios";

const Standings = () => {
  const [leagueId, setLeagueId] = useState(null);
  const [standings, setStandings] = useState([]);
  const [availableLeagues, setAvailableLeagues] = useState([]);

  useEffect(() => {
    // Fetch available leagues and update the state
    fetchAvailableLeagues();
  }, []);

  useEffect(() => {
    // Set a default league when the component mounts
    if (availableLeagues.length > 0) {
      const defaultLeagueId = availableLeagues[0].leagueShortcut;
      setLeagueId(defaultLeagueId);
      fetchStandings(defaultLeagueId);
    }
  }, [availableLeagues]);

  const fetchAvailableLeagues = async () => {
    try {
      const response = await axios.get("/api/leagues");
      const leaguesData = response.data;
      setAvailableLeagues(leaguesData);
    } catch (error) {
      console.error("Error fetching available leagues:", error);
    }
  };

  const fetchStandings = async (selectedLeagueId) => {
    try {
      const response = await axios.get(`/api/standings/${selectedLeagueId}`);
      const standingsData = response.data;
      setStandings(standingsData);
    } catch (error) {
      console.error("Error fetching standings:", error);
    }
  };

  const handleLeagueChange = async (event) => {
    const selectedLeagueId = event.target.value;
    setLeagueId(selectedLeagueId);

    // Check if selectedLeagueId is not null or undefined before making the API call
    if (selectedLeagueId) {
      fetchStandings(selectedLeagueId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-[460px] ml-20 mt-6 border-2 border-green-600 bg-white p-4 rounded-lg">
      <div className="w-full">
        <select
          id="leagueDropdown"
          onChange={handleLeagueChange}
          className="flex justify-center bg-green-500 text-sm mb-2 border-2 border-green-600 text-center text-white font-bold min-w-full"
        >
          {availableLeagues
            .filter((league) => [4638, 4637, 4608].includes(league.leagueId)) // Filter based on desired league IDs
            .map((league) => (
              <option
                className="text-white font-bold border-2"
                key={league.leagueId}
                value={league.leagueShortcut}
              >
                {league.leagueName}
              </option>
            ))}
        </select>
      </div>
      <div className="flex scrollbar-hide overflow-auto border-2 border-green-600">
        <table className="">
          <thead className="min-w-full bg-green-400 sticky top-0 text-white">
            <tr className="text-xs">
              <th className="p-1">#</th>
              <th className="p-1 text-start">Team</th>
              <th className="p-1">M</th>
              <th className="p-1">W/D/L</th>
              <th className="p-1">P</th>
            </tr>
          </thead>
          <tbody className="">
            {standings.map((team, index) => (
              <tr
                key={team.teamInfoId}
                className="bg-green-600 text-xs border-b-4 border-green-500"
              >
                <td className="text-white font-bold border-r-4 border-green-500 p-2">
                  {index + 1}
                </td>
                <td className="flex pt-2 space-x-1 pl-1 pr-1">
                  <img
                    src={team.teamIconUrl}
                    alt={team.teamName}
                    className="max-h-5 max-w-5 rounded-full"
                  />
                  <h1 className="text-white font-bold">{team.teamName}</h1>
                </td>
                <td className="text-center border-l-4 border-green-500 text-white font-bold p-1">
                  {team.matches}
                </td>
                <td className="text-center border-r-4 border-l-4 border-green-500 text-white font-bold p-1">{`${team.won}/${team.draw}/${team.lost}`}</td>
                <td className="text-center text-white font-bold p-1">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;
