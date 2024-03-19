import Link from "next/link";

const AllMatches = ({ matchesByLeague, selectedDate }) => {
    return (
        <div>
            {Object.entries(matchesByLeague).map(([competitionId, matches]) => {
                const matchesForSelectedDate = matches.filter(
                    (match) => {
                        const matchDate = new Date(match.date);
                        const formattedMatchDate = `${matchDate.getDate()}-${matchDate.getMonth() + 1}`;
                        return formattedMatchDate === selectedDate;
                    }
                );

                if (matchesForSelectedDate.length === 0) {
                    return null;
                }

                return (
                    <div className="mb-4 border-2 border-green-600" key={competitionId}>
                        <h2 className="text-base text-center bg-[#28d475] w-full text-white font-bold">
                            {matches[0].competitionName}
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
                                                {match.time.split(":").slice(0, 2).join(":")}
                                            </li>
                                        </div>
                                        <div>
                                            <li className="flex items-center justify-center">
                                                {match.teams && match.teams[0] && match.teams[0].name}
                                            </li>
                                            <li className="flex items-center justify-center">
                                                {match.teams && match.teams[1] && match.teams[1].name}
                                            </li>
                                        </div>
                                    </Link>
                                    <li>
                                        <button className="ml-8">
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
