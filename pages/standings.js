"use client";
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

    const fetchAvailableLeagues = async () => {
        try {
            const response = await axios.get('/api/leagues');
            const leaguesData = response.data;
            setAvailableLeagues(leaguesData);
            console.log(leaguesData)
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
        <div className="flex flex-col h-[400px] mt-4 border-2 border-green-600 bg-white p-4 pt-0 rounded-lg items-center justify-start">
          <div className="mb-2">
            <label htmlFor="leagueDropdown" className="mr-2 text-black"></label>
            <select
              id="leagueDropdown"
              onChange={handleLeagueChange}
              value={leagueId || ''}
              className="border border-green-500 p-1 text-black flex justify-center w-96 "
            >
              <option value="" disabled>Select a league</option>
              {availableLeagues
                    .filter(league => [4638,4637,4608].includes(league.leagueId)) // Filter based on desired league IDs
                    .map((league) => (
                <option key={league.leagueId} value={league.leagueShortcut}>
                  {league.leagueName}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-96 h-80 overflow-auto border-2 border-green-600 bg-white rounded-lg">
            <table className="max-w-full border-collapse border border-green-500">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="border border-green-500 p-2">#</th>
                  <th className="border border-green-500 p-2">Team</th>
                  <th className="border border-green-500 p-2">P</th>
                  <th className="border border-green-500 p-2">W/D/L</th>
                  <th className="border border-green-500 p-2">M</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr key={team.teamInfoId} className="bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500">
                    <td className="border border-green-500 p-2">{index + 1}</td>
                    <td className="flex border border-green-500 p-2">
                      <img
                        src={team.teamIconUrl}
                        alt={team.teamName}
                        className="h-6 rounded-full"
                      />
                      <h1>{team.teamName}</h1>
                    </td>
                    <td className="border border-green-500 p-2">{team.points}</td>
                    <td className="border border-green-500 p-2">{team.won}/{team.draw}/{team.lost}L</td>
                    <td className="border border-green-500 p-2">{team.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
    
    export default Standings;