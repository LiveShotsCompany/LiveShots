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
      SetMatchInfo(matchArray);
    };
    getData();
  }, []);

  console.log(matchInfo);

  return (
    <div className="max-screen-full">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-200">
        <Nav />
        <div className="bg-gray-200 pt-20 pl-60 pr-60 pb-20">
          <div className="flex flex-col border border-green-600 rounded-lg items-center justify-center bg-white pt-8 pb-8">
            <h1 className="mb-4 text-green-600 text-xl font-bold">
              User Info:
            </h1>
            <div className="flex justify-center grid grid-cols-2 gap-8">
              {matchInfo.map((match) => (
                <ul
                  className="flex items-center rounded-lg bg-green-600 text-black border border-green-500 mb-2 p-2"
                  key={match.away_id}
                >
                  <div className="flex flex-row items-center w-full text-white font-bold justify-center space-x-8">
                    <div className="">
                      <li className="flex items-center justify-center">
                        {match.scheduled}
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
                      <img src="/favorite.svg" alt="favorite" className="h-6" />
                    </li>
                  </div>
                </ul>
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
