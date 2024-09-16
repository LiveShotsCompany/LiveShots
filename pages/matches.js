import React, { useEffect, useState } from "react";
import Nav from "@/pages/nav";
import Standings from "@/pages/standings";
import AllMatches from "@/components/AllMatches";
import FavoriteMatches from "@/components/FavoriteMatches";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [favoriteMatches, setFavoriteMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("/api/matches");
        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }

    fetchMatches();
  }, []);

  
  useEffect(() => {
    const fetchFavoriteMatches = async () => {
      try {
        const response = await fetch("/api/user-matches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorite matches");
        }

        const data = await response.json();
        setFavoriteMatches(data.favoriteMatches);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteMatches();
  }, [userId]);

  const matchesByLeague = {};

  Object.keys(matches).forEach((competitionId) => {
    const matchesForCompetition = matches[competitionId];

    matchesForCompetition.forEach((match) => {
      if (!matchesByLeague[competitionId]) {
        matchesByLeague[competitionId] = [];
      }
      matchesByLeague[competitionId].push(match);
    });
  });

  // Generate the date button for to filter on matches
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

  return (
    <div className="bg-gray-300">
      <Nav />
      <div className="flex flex-row space-x-20">
        <Standings />
        <div className="flex justify-center h-[560px] mt-6 pb-4">
          <div className="flex flex-col border-2 border-green-600 space-y-2 bg-gray-200 p-4 rounded-lg items-center justify-start">
            <div className="flex justify-center w-96 ">
              {generateDateButtons()}
            </div>
            <div className="flex flex-col pt-2 scrollbar-hide overflow-auto">
              {!isLoggedIn ? (
                <AllMatches
                  matchesByLeague={matchesByLeague}
                  selectedDate={selectedDate}
                  favoriteMatches={favoriteMatches}
                />
              ) : (
                <>
                  <FavoriteMatches
                    selectedDate={selectedDate}
                    favoriteMatches={favoriteMatches}
                    userId={userId}
                  />
                  <AllMatches
                    matchesByLeague={matchesByLeague}
                    selectedDate={selectedDate}
                    favoriteMatches={favoriteMatches}
                    setFavoriteMatches={setFavoriteMatches}
                    userId={userId}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
