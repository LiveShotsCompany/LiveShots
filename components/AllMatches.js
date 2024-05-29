import React, { useEffect, useState } from "react";
import Link from "next/link";

const AllMatches = ({ matchesByLeague, selectedDate, userId }) => {
  const [favoriteMatches, setFavoriteMatches] = useState([]);

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

  const isMatchFavorited = (matchId) => favoriteMatches.includes(matchId);

  const handleToggleFavorite = async (matchId, homeTeam, awayTeam) => {
    try {
      if (isMatchFavorited(matchId)) {
        const response = await fetch("/api/remove-favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matchId, userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove favorite match");
        }

        // Remove matchId from favoriteMatches state
        setFavoriteMatches((prevState) =>
          prevState.filter((id) => id !== matchId),
        );
      } else {
        const response = await fetch("/api/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matchId, homeTeam, awayTeam, userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to favorite match");
        }

        setFavoriteMatches((prevState) => [...prevState, matchId]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {Object.entries(matchesByLeague).map(([competitionId, matches]) => {
        const matchesForSelectedDate = matches.filter((match) => {
          const matchDate = new Date(match.date);
          const formattedMatchDate = `${matchDate.getDate()}-${
            matchDate.getMonth() + 1
          }`;
          return formattedMatchDate === selectedDate;
        });

        if (matchesForSelectedDate.length === 0) {
          return null;
        }

        console.log(matchesForSelectedDate);

        return (
          <div className="mb-4 border-2 border-green-600" key={competitionId}>
            <h2 className="text-base text-center bg-[#28d475] w-full text-white font-bold">
              {matches[0].competitionName}
            </h2>
            {matchesForSelectedDate.map((match) => (
              <ul
                key={match.id}
                className={`flex items-center bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500`}
              >
                <div className="flex flex-row items-center w-96 text-white font-bold justify-center space-x-8">
                  <Link key={match.id} href={`/matches/${match.id}`}>
                    <li className="flex items-center justify-center">
                      {match.time.split(":").slice(0, 2).join(":")}
                    </li>
                  </Link>
                  <Link key={match.id} href={`/matches/${match.id}`}>
                    <li className="flex items-center justify-center">
                      {match.teams && match.teams[0] && match.teams[0].name}
                    </li>
                    <li className="flex items-center justify-center">
                      {match.teams && match.teams[1] && match.teams[1].name}
                    </li>
                  </Link>
                  <li>
                    <button
                      className=""
                      onClick={() =>
                        handleToggleFavorite(
                          match.id,
                          match.teams[0].name,
                          match.teams[1].name,
                        )
                      }
                    >
                      <img
                        src={
                          isMatchFavorited(match.id)
                            ? "/favorite-1.svg"
                            : "/favorite.svg"
                        }
                        alt="favorite"
                        className="h-6"
                      />
                    </button>
                  </li>
                </div>
              </ul>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AllMatches;
