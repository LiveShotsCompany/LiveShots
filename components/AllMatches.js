// components/AllMatches.js
import React from "react";
import Link from "next/link";

const AllMatches = ({ matchesByLeague, selectedDate, handleToggleFavorite }) => {
    return (
        <div>
            {Object.keys(matchesByLeague).map((leagueId) => {
                const matchesForSelectedDate = matchesByLeague[leagueId].filter(
                    (match) => match.date === selectedDate + "-2024"
                );
                if (matchesForSelectedDate.length === 0) {
                    return null;
                }
                return (
                    <div className="mb-4 border-2 border-green-600" key={leagueId}>
                        <h2 className="text-base text-center bg-[#28d475] w-full text-white font-bold">
                            {matchesForSelectedDate[0].competition}
                        </h2>
                        {matchesForSelectedDate.map((match) => (
                            <ul
                                className={`flex items-center bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500`}
                                key={match.id}
                            >
                                <div className="flex flex-row items-center justify-center w-96 text-white font-bold">
                                    <Link
                                        className="flex flex-row items-center space-x-8"
                                        href={`/matches/${match.id}`}
                                    >
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
                                    </Link>
                                    <li>
                                        <button className="" onClick={() => handleToggleFavorite(match.id)}>
                                            <img
                                                src={match.favorite ? 'favorite-1.svg' : 'favorite.svg'}
                                                alt=""
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
