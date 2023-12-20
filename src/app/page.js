import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import Matches from "@/app/pages/matches";
import { cookies } from "next/headers";

const Home = () => {
  const cookieStore = cookies();
  return (
    <div className="h-full overflow-auto bg-gray-200">
      <div className="h-full">
        <Nav cookieStore={cookieStore} />
        <Matches />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
