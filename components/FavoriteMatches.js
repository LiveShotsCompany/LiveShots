import React from "react";

const FavoriteMatches = ({ matchesByLeague, selectedDate, favoriteMatches, handleToggleFavorite }) => {
    return (
        <div className="border-2 border-green-600 mb-4">
            <h2 className="text-base text-center bg-green-400 text-white font-bold">
                Favorite Matches
            </h2>
            {Object.keys(matchesByLeague).map((leagueId) => {
                const matchesForSelectedDate = matchesByLeague[leagueId].filter(
                    (match) =>
                        match.date === selectedDate + "-2024" &&
                        (favoriteMatches.includes(match.id) || match.favorite)
                );
                if (matchesForSelectedDate.length === 0) {
                    return null;
                }
                return (
                    <div className="" key={leagueId}>
                        {matchesForSelectedDate.map((match) => (
                            <div key={match.id}>
                                <ul
                                    className={`flex items-center bg-green-600 hover:bg-green-500 text-sm border-b-4 border-green-500`}
                                >
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
                                            <button
                                                className=""
                                                onClick={() => handleToggleFavorite(match.id)}
                                            >
                                                <img
                                                    src="/favorite-1.svg"
                                                    alt="favorite"
                                                    className="h-6"
                                                />
                                            </button>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default FavoriteMatches;
