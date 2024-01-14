import Nav from "@/components/nav";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-col h-full bg-gray-200">
        <Link href="/matches">dd</Link>
      </div>
    </div>
  );
};

export default Home;
