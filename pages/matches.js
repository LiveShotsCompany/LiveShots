// pages/matches.js
"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/pages/nav";
import Standings from "@/pages/standings";
import AllMatches from "@/components/AllMatches";
import FavoriteMatches from "@/components/FavoriteMatches";
import { useRouter } from "next/router";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [favoriteMatches, setFavoriteMatches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch('/api/matches');
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }

        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    }

    fetchMatches();
  }, []);

  useEffect(() => {
    const firstMatch = matches.length > 0 ? matches[0] : null;

    if (firstMatch && !selectedDate) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
      }`;
      setMatchInfo(matches);
      setSelectedDate(formattedDate);
    }
  }, [matches, selectedDate]);

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
    startOfWeek.setDate(today.getDate() - 7);

    const dates = [];
    const currentDate = new Date(startOfWeek);

    for (let i = 0; i < 15; i++) {
      const dayAbbreviation = getDayAbbreviation(currentDate.getDay());
      const formattedDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
      }`;
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

  const handleToggleFavorite = async (matchId) => {
    try {
      const isCurrentlyFavorite = favoriteMatches.includes(matchId);
      setMatches((prevMatches) =>
          prevMatches.map((match) =>
              match.id === matchId
                  ? { ...match, favorite: !isCurrentlyFavorite }
                  : match
          )
      );
      console.log(isCurrentlyFavorite)
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId,
          isFavorite: isCurrentlyFavorite,
        }),
      });

      setFavoriteMatches((prevFavorites) => {
        if (isCurrentlyFavorite) {
          return prevFavorites.filter((id) => id !== matchId);
        } else {
          return [...prevFavorites, matchId];
        }
      });
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };


  return (
      <div className="bg-gray-200">
        <Nav />
        <div className="flex flex-row space-x-20">
          <Standings />
          <div className="flex justify-center h-[560px] mt-6 pb-4">
            <div className="flex flex-col border-2 border-green-600 space-y-2 bg-white p-4 rounded-lg items-center justify-start">
              <div className="flex justify-center w-96 ">
                {generateDateButtons()}
              </div>
              <div className="flex flex-col pt-2 scrollbar-hide overflow-auto">
                <FavoriteMatches
                    matchesByLeague={matchesByLeague}
                    selectedDate={selectedDate}
                    favoriteMatches={favoriteMatches}
                    handleToggleFavorite={handleToggleFavorite}
                />
                <AllMatches
                    matchesByLeague={matchesByLeague}
                    selectedDate={selectedDate}
                    handleToggleFavorite={handleToggleFavorite}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Matches;
