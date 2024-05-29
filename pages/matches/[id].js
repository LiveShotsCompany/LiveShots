import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "@/pages/nav";
import Standings from "@/pages/standings";

const MatchDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [matchDetails, setMatchDetails] = useState(null);
  const [userId, setUserId] = useState("");
  const [favoriteMatches, setFavoriteMatches] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    if (id) {
      fetchMatchDetails();
    }
  }, [id]);

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
        console.log("Favorite Matches:", data.userFavoriteMatches);
        console.log(id)
        const favoriteMatch = data.userFavoriteMatches.find(match => match.Id === parseInt(id));
        console.log("Favorite Match:", favoriteMatch);
        setIsFavorite(!!favoriteMatch);
        console.log('Is Favorite:', !!favoriteMatch);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFavoriteMatches();
  }, [userId, id]);


  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(`/api/matchdetails?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }
      const data = await response.json();
      setMatchDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch("/api/remove-favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, matchId: id }),
        });
        setIsFavorite(false);
      } else {
        await fetch("/api/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            matchId: id,
            homeTeam: matchDetails.teams[0].name,
            awayTeam: matchDetails.teams[1].name,
          }),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!matchDetails) {
    return <div>Loading...</div>;
  }
  
  console.log(isFavorite)
  
  return (
      <div className="bg-gray-300">
        <Nav />
        <div className="flex flex-row space-x-20">
          <Standings />
          <div className="flex justify-center h-[560px] mt-6 pb-4">
            <div
                className="flex flex-col bg-gray-100 space-y-2 p-4 rounded-lg items-center justify-start"
                style={{ borderWidth: "3px", borderColor: "#379322" }}
            >
              <div
                  className="bg-green-500 p-1 rounded-lg w-96"
                  style={{ borderWidth: "3px", borderColor: "#379322" }}
              >
                <div className="flex items-center justify-center text-white font-bold text-lg">
                  {matchDetails.competitionName}
                </div>
              </div>
              <div
                  className="max-h-[460px] bg-green-600 rounded-lg h-full p-4 w-96 overflow-y"
                  style={{ borderWidth: "3.5px", borderColor: "#379322" }}
              >
                <div className="space-y-5">
                  <div className="flex flex-row items-center text-white font-bold justify-center space-x-8">
                    <div className="flex items-center justify-center">
                      {matchDetails.time.split(":").slice(0, 2).join(":")}
                    </div>
                    <div className="">
                      {matchDetails.teams.map((team) => (
                          <div
                              className="flex items-center justify-center text-white"
                              key={team.id}
                          >
                            {team.name}
                          </div>
                      ))}
                    </div>
                    <div>
                      <button onClick={handleToggleFavorite}>
                        {isFavorite ? (
                            <img
                                src="/favorite-1.svg"
                                alt="favorite"
                                className="h-6"
                            />
                        ) : (
                            <img
                                src="/favorite.svg"
                                alt="favorite"
                                className="h-6"
                            />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row max-h-[220px] space-x-4 text-white font-bold justify-center">
                    {matchDetails.teams.map((team) => (
                        <div key={team.id} className="flex flex-col items-center">
                          <div className="w-40 h-8 p-0.5 bg-green-500 text-sm text-center rounded-lg">
                            {team.name}
                          </div>
                          <div className="flex flex-col items-center max-h-[200px] scrollbar-hide overflow-y-auto">
                            {team.players.map((player) => (
                                <div
                                    key={player.id}
                                    className="text-center text-sm items-center p-2 w-44 border-b-4 border-green-500"
                                >
                                  {player.name}
                                </div>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MatchDetails;
