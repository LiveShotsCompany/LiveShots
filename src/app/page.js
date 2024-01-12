import Nav from "./components/nav";
import Footer from "./components/footer";
import { cookies } from "next/headers";
import Matches from "./pages/matches";
const Home = () => {
  const cookieStore = cookies();
  return (
    <div className="flex flex-col h-full bg-gray-200">
      <Nav cookieStore={cookieStore} />
      <Matches />
      <Footer />
    </div>
  );
};

export default Home;
