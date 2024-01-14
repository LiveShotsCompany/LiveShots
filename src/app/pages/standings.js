  // Standings.js
  "use client";
  import React, { useEffect, useState } from "react";
  import axios from "axios";


  const Standings = () => {
    const [leagueId, setLeagueId] = useState(null);
    const [standings, setStandings] = useState([]);
    const [availableLeagues, setAvailableLeagues] = useState([]);
    const allowedLeagueIds = ['4608', '4637', '4638']; // Add the IDs you want to allow


    useEffect(() => {
      // Fetch available leagues and update the state
      fetchAvailableLeagues();
    }, []);
  
    const fetchAvailableLeagues = async () => {
      try {
        const response = await axios.get('/api/leagues');
        const leaguesData = response.data;
  
        console.log('All leagues:', leaguesData);
  
        // Check if the leagueId property exists in the API response
        if (!leaguesData[0]?.leagueId) {
          console.error('Invalid API response format. Missing leagueId property.');
          return;
        }
  
        // Filter the fetched leagues based on allowed IDs
        const filteredLeagues = leaguesData.filter((league) => allowedLeagueIds.includes(league.leagueId));
  
        console.log('Filtered leagues:', filteredLeagues);
  
        setAvailableLeagues(filteredLeagues);
      } catch (error) {
        console.error('Error fetching available leagues:', error);
      }
    };
  
    console.log(standings)

    const handleLeagueChange = async (event) => {
      const selectedLeagueId = event.target.value;
      setLeagueId(selectedLeagueId);
    
      try {
        const response = await axios.get(`/api/standings/${selectedLeagueId}`);
        const standingsData = response.data;
        setStandings(standingsData);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };


  return (
    <div className="ml-20 max-w-2xl mb-4 mt-4 border-2 border-green-600">
      <h2 className="text-lg pl-2 text-xl text-center bg-[#28d475] w-full text-black font-bold">
        Standings for {leagueId}
      </h2>
      <div className="flex justify-center mb-2">
        <label htmlFor="leagueDropdown" className="mr-2 text-black">
          Select League:
        </label>
        <select
          id="leagueDropdown"
          onChange={handleLeagueChange}
          value={leagueId || ''}
          className="border border-green-500 p-1 text-black"
        >
          <option value="" disabled>Select a league</option>
          {availableLeagues.map((league) => (
            <option key={league.leagueId} value={league.leagueShortcut}>
              {league.leagueName}
            </option>
          ))}
        </select>
      </div>
      <div className="table-container overflow-y-auto max-h-600">
        <table className="w-full border-collapse border border-green-500">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="border border-green-500 p-2">#</th>
              <th className="border border-green-500 p-2">Team</th>
              <th className="border border-green-500 p-2">Points</th>
              <th className="border border-green-500 p-2">W/D/L</th>
              <th className="border border-green-500 p-2">Matches Played</th>
              <th className="border border-green-500 p-2">Fav</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={team.teamInfoId} className="bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500">
                <td className="border border-green-500 p-2">{index + 1}</td>
                <td className="border border-green-500 p-2">
                  <img
                    src={team.teamIconUrl}
                    alt={team.teamName}
                    className="h-8 w-8 rounded-full"
                  />
                  {team.teamName}
                </td>
                <td className="border border-green-500 p-2">{team.points}</td>
                <td className="border border-green-500 p-2">{team.won}W {team.draw}D {team.lost}L</td>
                <td className="border border-green-500 p-2">{team.matches} played</td>
                <td className="border border-green-500 p-2">
                  <img
                    src="/favorite.svg"
                    alt="favorite"
                    className="h-6"
                  />
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