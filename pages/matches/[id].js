import Link from "next/link";
import Nav from "@/pages/nav";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MatchDetail = ({}) => {
  const [matchInfo, setMatchInfo] = useState({});
  const router = useRouter();
  const id = +router.query.id;

  useEffect(() => {
    async function fetchMatchDetails() {
      try {
        const response = await fetch(`/api/matches`);
        if (!response.ok) {
          throw new Error('Failed to fetch match details');
        }

        const data = await response.json();
        const selectedMatch = data.find(match => match.id === id);

        if (selectedMatch) {
          setMatchInfo(selectedMatch);
          console.log(selectedMatch);
        } else {
          console.warn(`Match with ID ${id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    }

    fetchMatchDetails();
  }, [id]);

  return (
      <div>
        <Nav />
        <div className="flex justify-center h-[560px] bg-gray-200 pt-4 pb-4">
          <div className="flex flex-col border-2 border-green-600 bg-white p-4 rounded-lg items-center justify-start">
            <div className="flex flex-col pt-2 overflow-auto">
              <div className="border-2 border-green-600 mb-4">
                <ul className="flex items-center bg-green-600 hover:bg-green-500 text-black text-sm border-b-4 border-green-500">
                  <div className="flex flex-row items-center w-96 text-white font-bold justify-center space-x-8">
                    <div className="">
                      <li className="flex items-center justify-center">
                        {matchInfo.time}
                      </li>
                    </div>
                    <div>
                      <li className="flex text-white items-center justify-center">
                        {matchInfo.home_name}
                      </li>
                      <li className="flex items-center justify-center">
                        {matchInfo.away_name}
                      </li>
                    </div>
                    <div>
                      <li className="flex items-center justify-center">
                        {matchInfo.score}
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
              </div>
            </div>
          </div>
        </div>
        <Link href="/matches">Back to matches</Link>
      </div>
  );
};

export default MatchDetail;
