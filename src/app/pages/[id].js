import Link from "next/link";

const MatchDetail = ({ match }) => {
    return (
        <div>
            <h1>{match.home_name} vs {match.away_name}</h1>
            <Link href="/matches">
                <a>Back to Matches</a>
            </Link>
        </div>
    );
};