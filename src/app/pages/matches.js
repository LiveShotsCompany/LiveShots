"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Matches = () => {
  const [matchInfo, SetMatchInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const query = await fetch(
        "https://livescore-api.com/api-client/fixtures/matches.json?key=Kb1vk8znJhYCmtZu&secret=IqUqUJzS5F203WRN8Tjs1SQLaPnwjm11",
      );
      const response = await query.json();
      const matchArray = Object.values(response.data.fixtures);
      matchArray.sort((a, b) => a.competition_id - b.competition_id);
      SetMatchInfo(matchArray);
    };
    getData();
  }, []);

  const matchesByLeague = {};

  matchInfo.forEach((match) => {
    if (!matchesByLeague[match.competition.name]) {
      matchesByLeague[match.competition.name] = [];
    }
    matchesByLeague[match.competition.name].push(match);
  });

  return (
    <div className="flex justify-center max-h-full bg-gray-200 pt-6 pb-6">
      <div className="flex flex-col border-2 border-green-600 w-2/6 max-h-full rounded-lg items-center justify-center bg-gray-100 pt-8 pb-8">
        <div className="flex justify-left">
          <h1 className="mb-4 text-green-600 text-2xl font-bold">
            {new Date().toLocaleDateString()}
          </h1>
        </div>
        <div className="flex justify-center grid grid-cols-1 pl-12 overflow-y-auto scrollbar">
          {Object.entries(matchesByLeague).map(([leagueId, matches]) => (
            <div className="mb-4 border-2 border-green-600">
              <React.Fragment key={leagueId}>
                <h2 className="text-xl pl-2 text-xl text-center text-green-600 mr-4 font-bold">
                  {matches[0].competition.name}
                </h2>
                {matches.map((match) => (
                  <Link key={match.id} href={`/pages/${match.id}`}>
                    <ul className="flex items-center bg-green-600 text-black text-sm border-b-4 border-green-500">
                      <div className="flex flex-row items-center w-96 text-white font-bold justify-center space-x-8">
                        <div className="">
                          <li className="flex items-center justify-center">
                            {match.time.slice(0, -3)}
                          </li>
                        </div>
                        <div>
                          <li className="flex items-center justify-center">
                            {match.home_name}
                          </li>
                          <li className="flex items-center justify-center">
                            {match.away_name}
                          </li>
                        </div>
                        <div>
                          <li className="flex items-center justify-center">
                            {match.score}
                          </li>
                        </div>
                        <li>
                          <img
                            src="/favorite.svg"
                            alt="favorite"
                            className="h-6"
                          />
                        </li>
                      </div>
                    </ul>
                  </Link>
                ))}
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;
