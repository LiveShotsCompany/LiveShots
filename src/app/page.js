"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/app/nav";
import Footer from "@/app/footer";

const Home = () => {
  const [matchInfo, SetMatchInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const query = await fetch(
        "http://livescore-api.com/api-client/scores/live.json?key=Kb1vk8znJhYCmtZu&secret=IqUqUJzS5F203WRN8Tjs1SQLaPnwjm11",
      );
      const response = await query.json();
      const matchArray = Object.values(response.data.match);
      matchArray.sort((a, b) => a.competition_id - b.competition_id);
      SetMatchInfo(matchArray);
    };
    getData();
  }, []);

  const currentDate = new Date().toLocaleDateString();
  const matchesByLeague = {};

  matchInfo.forEach((match) => {
    if (!matchesByLeague[match.competition_name]) {
      matchesByLeague[match.competition_name] = [];
    }
    matchesByLeague[match.competition_name].push(match);
  });


  console.log(matchInfo);

  return (
    <div className="">
      <div className="">
        <Nav />
        <div className="flex justify-center bg-gray-200 pt-6 pb-6">
          <div className="flex flex-col border border-green-600 w-2/5 h-[34rem] rounded-lg items-center justify-center bg-white pt-8 pb-8">
            <div className="flex justify-left">
              <h1 className="mb-4 text-green-600 text-2xl font-bold">
                {currentDate}
              </h1>
            </div>
            <div className="flex justify-center grid grid-cols-1 pl-12 overflow-y-auto scrollbar">
              {Object.entries(matchesByLeague).map(([leagueId, matches]) => (
                  <React.Fragment key={leagueId}>
                    <h2 className="text-xl text-green-600 font-bold mb-4">{matches[0].competition_name}</h2>
                    {matches.map((match) => (
                        <ul
                            className="flex items-center rounded-lg bg-green-600 text-black border border-green-500 mb-2 mr-4 p-2"
                        >
                          <div className="flex flex-row items-center w-full text-white font-bold justify-center space-x-8">
                            <div className="">
                              <li className="flex items-center justify-center">{match.time}</li>
                            </div>
                            <div>
                              <li className="flex items-center justify-center">{match.home_name}</li>
                              <li className="flex items-center justify-center">{match.away_name}</li>
                            </div>
                            <div>
                              <li className="flex items-center justify-center">{match.score}</li>
                            </div>
                            <li>
                              <img src="/favorite.svg" alt="favorite" className="h-6" />
                            </li>
                          </div>
                        </ul>
                    ))}
                  </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
