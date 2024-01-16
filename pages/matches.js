"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fixtures } from "@/components/fixtures";
import Nav from "@/components/nav";
import Standings from "@/pages/standings";

const Matches = () => {
  const [matchInfo, setMatchInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const matchArray = Object.values(fixtures);
    setMatchInfo(matchArray);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
    }`;
    setSelectedDate(formattedDate);
  }, []);

  const matchesByLeague = {};

  matchInfo.forEach((match) => {
    if (!matchesByLeague[match.competitionId]) {
      matchesByLeague[match.competitionId] = [];
    }
    matchesByLeague[match.competitionId].push(match);
  });

  // Sort matches by date and time
  Object.keys(matchesByLeague).forEach((leagueId) => {
    matchesByLeague[leagueId].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });
  });

  const generateDateButtons = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7);

    const dates = [];
    const currentDate = new Date(startOfWeek);

    for (let i = 0; i < 15; i++) {
      const dayAbbreviation = getDayAbbreviation(currentDate.getDay());
      const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}`;
      dates.push({ dayAbbreviation, formattedDate });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
        <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
          {dates.map(({ dayAbbreviation, formattedDate }) => (
              <button
                  key={formattedDate}
                  className={`${
                      formattedDate === selectedDate ? "bg-green-600" : "bg-green-400"
                  } text-white font-bold min-w-12 min-h-12 hover:bg-green-600 text-[12px] pb-1 pt-1 border-2 border-green-600`}
                  onClick={() => handleDateClick(formattedDate)}
              >
                <div>
                  <h1>{formattedDate}</h1>
                  <h1>{dayAbbreviation}</h1>
                </div>
              </button>
          ))}
        </div>
    );
  };


  const getDayAbbreviation = (dayIndex) => {
    const daysAbbreviation = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
    return daysAbbreviation[dayIndex];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
      <div className="min-h-full bg-gray-200">
        <Nav />
        <div className="flex flex-row space-x-14">
        <Standings/>
        <div className="flex justify-center h-[560px] pt-4 pb-4">
          <div className="flex flex-col border-2 border-green-600 space-y-2 bg-white p-4 rounded-lg items-center justify-start">
            <div className="flex justify-center w-96 ">
              {generateDateButtons()}
            </div>
            <div className="flex flex-col pt-2 scrollbar-hide overflow-auto">
              <div className="border-2 border-green-600 mb-4">
                <h2 className="text-base text-center bg-green-400 text-white font-bold">
                  Favorite Matches
                </h2>
                {Object.keys(matchesByLeague).map((leagueId) => {
                  const matchesForSelectedDate = matchesByLeague[leagueId].filter(
                      (match) =>
                          match.date === selectedDate + "-2024" && match.favorite
                  );
                  if (matchesForSelectedDate.length === 0) {
                    return null;
                  }
                  return (
                      <div className="" key={leagueId}>
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
                                    <button className="">
                                      <img
                                          src="/favorite-1.svg"
                                          alt="favorite"
                                          className="h-6"
                                      />
                                    </button>
                                  </li>
                                </div>
                              </ul>
                            </Link>
                        ))}
                      </div>
                  );
                })}
              </div>
              {Object.keys(matchesByLeague).map((leagueId) => {
                const matchesForSelectedDate = matchesByLeague[leagueId].filter(
                    (match) =>
                        match.date === selectedDate + "-2024" && !match.favorite
                );
                if (matchesForSelectedDate.length === 0) {
                  return null;
                }
                return (
                    <div className="mb-4 border-2 border-green-600" key={leagueId}>
                      <h2 className="text-base text-base text-center bg-[#28d475] w-full text-white font-bold">
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
                                  <button className="">
                                    <img
                                        src="/favorite.svg"
                                        alt="favorite"
                                        className="h-6"
                                    />
                                  </button>
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
        </div>
      </div>
  );
};

export default Matches;
