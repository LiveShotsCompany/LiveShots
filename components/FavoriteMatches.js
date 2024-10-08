import React, { useEffect, useState } from "react";
import Link from "next/link";

const FavoriteMatches = ({ selectedDate, userId }) => {
  const [favoriteMatches, setFavoriteMatches] = useState([]);

  // Fetch user's favorite matches when the component mounts or userId changes
  useEffect(() => {
    async function fetchFavoriteMatches() {
      try {
        const response = await fetch("/api/user-favorite-matches", {
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
        setFavoriteMatches(data.userFavoriteMatches);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFavoriteMatches();
  }, [userId]);

  // Filter favorite matches by selected date
  const filteredMatches = favoriteMatches.filter((match) => {
    const matchDate = new Date(match.date);
    const formattedMatchDate = `${matchDate.getDate()}-${
        matchDate.getMonth() + 1
    }`;
    return formattedMatchDate === selectedDate;
  });

  const handleRemoveFavorite = async (matchId) => {
    try {
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

      setFavoriteMatches((prevState) =>
          prevState.filter((match) => match.id !== matchId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  console.log(filteredMatches);

  return (
      <div className="border-2 border-green-600 mb-4">
        <h2 className="text-base text-center bg-green-400 text-white font-bold">
          Favorite Matches
        </h2>
        {filteredMatches.length === 0 ? (
            <h1 className="text-center">No favorite matches found</h1>
        ) : (
            filteredMatches.map((match) => (
                <div
                    className={`flex items-center bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500`}
                    key={match.Id}
                >
                  <div className="flex flex-row items-center w-96 text-white font-bold justify-center space-x-8">
                    <Link key={match.Id} href={`/matches/${match.Id}`}>
                      <div className="flex items-center justify-center">
                        {match.time.split(":").slice(0, 2).join(":")}
                      </div>
                    </Link>
                    <Link key={match.Id} href={`/matches/${match.Id}`}>
                      <div className="flex items-center justify-center text-white">
                        {match.homeTeam}
                      </div>
                      <div className="flex items-center justify-center">
                        {match.awayTeam}
                      </div>
                    </Link>
                    <div>
                      <button
                          className=""
                          onClick={() => handleRemoveFavorite(match.id)}
                      >
                        <img src="/favorite-1.svg" alt="favorite" className="h-6" />
                      </button>
                    </div>
                  </div>
                </div>
            ))
        )}
      </div>
  );
};

export default FavoriteMatches;
