"use client";
import { useRouter } from "next/router";

const Navbar = () => {
 
    const router = useRouter();
    
    const handleSignOut  = async () => {
        await router.push('/')
    };
  

  return (
      <nav className="bg-green-600 border-b-4 border-white">
        <div className="flex max-w-screen-lg items-center justify-between mx-auto p-2">
          <div className="rounded-lg hover:bg-green-500 w-48">
            <a href="/matches" className="flex items-center space-x-1 relative">
              <img
                  src="/soccer-ball-svgrepo-com.svg"
                  className="h-14"
                  alt="LiveShots"
              />
              <span className="self-center text-white text-2xl font-semibold whitespace-nowrap pr-10">
              LiveShots
            </span>
            </a>
          </div>
            <div>
            <button
                onClick={handleSignOut}
                className="w-full text-white border-2 border-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Sign Out</button>
            </div>
        </div>
      </nav>
  );
};

export default Navbar;
