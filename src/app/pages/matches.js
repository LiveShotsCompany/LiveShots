"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fixtures } from "../fixtures";

const Matches = () => {
  const [matchInfo, setMatchInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const matchArray = Object.values(fixtures);
    setMatchInfo(matchArray);
    setSelectedDate('1-7-2024');
  }, []);

  const matchesByLeague = {};

  matchInfo.forEach((match) => {
    if (!matchesByLeague[match.competitionId]) {
      matchesByLeague[match.competitionId] = [];
    }
    matchesByLeague[match.competitionId].push(match);
  });

  const generateDateButtons = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const dates = [];
    console.log(dates)
    const currentDate = new Date(startOfWeek);

    for (let i = 0; i < 7; i++) {
      const formattedDate = `${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}-${currentDate.getFullYear()}`;
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.map((date) => (
      <button
        key={date}
        className={`${
          date === selectedDate ? "bg-green-600" : "bg-green-400"
        } text-white font-bold w-full hover:bg-green-600 text-[10px] pb-1 pt-1 border-2 border-green-600`}
        onClick={() => handleDateClick(date)}
      >
        {date}
      </button>
    ));
  };
  
  console.log(selectedDate)

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex justify-center max-h-full bg-gray-200 pt-4 pb-4">
      <div className="flex flex-col border-2 border-green-600 w-1/7 max-1/2 rounded-lg items-center justify-center bg-gray-100 pt-5 pb-8">
        <div className="flex justify-center w-full pr-2 pl-4">
          <div className="flex justify-center w-full space-x-2">
            {generateDateButtons()}
          </div>
        </div>
        <div className="flex justify-center grid grid-cols-1 pl-6 pt-1 overflow-y-auto scrollbar">
          {Object.keys(matchesByLeague).map((leagueId) => {
            const matchesForSelectedDate = matchesByLeague[leagueId].filter(
              (match) =>
                new Date(match.date).toLocaleDateString() === selectedDate,
            );

            if (matchesForSelectedDate.length === 0) {
              return null;
            }
            return (
              <div
                className="mb-4 mt-4 border-2 border-green-600"
                key={leagueId}
              >
                <h2 className="text-lg pl-2 text-xl text-center bg-[#28d475] w-full text-white font-bold">
                  {matchesForSelectedDate[0].competition}
                </h2>
                {matchesForSelectedDate.map((match) => (
                  <Link key={match.id} href={`/matches/${match.id}`}>
                    <ul className="flex items-center bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500">
                      <div className="flex flex-row items-center w-96 text-white font-bold justify-center space-x-8">
                        <div className="">
                          <li className="flex items-center justify-center">
                            {match.time}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;
