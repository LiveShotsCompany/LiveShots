import Nav from "./components/nav";
import Footer from "./components/footer";
import { cookies } from "next/headers";
import Matches from "./matches";

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
