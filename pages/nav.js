"use client";
import { useState, useRef } from "react";

const Navbar = ({user}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileIconPosition, setProfileIconPosition] = useState({
    top: 0,
    left: 0,
  });
  const modalRef = useRef(null);

  const openModal = () => {
    const profileIcon = document.getElementById("profile-icon");
    if (profileIcon) {
      const rect = profileIcon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 12;
      const centerY = rect.top + rect.height / 12;

      setProfileIconPosition({ top: centerY, left: centerX });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(email + password )

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log('Login successful:', data);
      closeModal();
    } catch (error) {
      setError(error.message || 'Failed to log in');
    }
  };

  return (
      <nav className="bg-green-600 border-b-4 border-white">
        <div className="flex flex-wrap max-w-screen-lg items-center justify-between mx-auto p-2">
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
          <div className="relative rounded-lg hover:bg-green-500">
            <a
                id="profile-icon"
                className="group flex items-center space-x-3 rtl:space-x-reverse relative"
                onClick={openModal}
            >
              <img src="/profile.svg" className="h-14" alt="LiveShots" />
            </a>
          </div>
          {isModalOpen && (
              <div
                  ref={modalRef}
                  className="fixed flex justify-center items-center"
                  style={{
                    top: profileIconPosition.top,
                    left: profileIconPosition.left,
                  }}
              >
                <div className="flex flex-col items-center bg-green-500 w-52 h-40 border-2 border-green-700 rounded-lg p-4 rounded-lg">
                  <h1 className="text-white text-center font-bold w-32">Profile:</h1>
                  {user ? (
                      <div>
                        <h1 className="text-white font-bold text-sm p-1">{user.name}</h1>
                        <h1 className="text-white font-bold text-sm p-1">{user.email}</h1>
                      </div>
                  ) : (
                      <div className="flex flex-col items-center">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-44 text-white font-bold text-sm p-1 bg-transparent border-b border-green-700 rounded-none placeholder-white placeholder-opacity-50"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-44 text-white font-bold text-sm p-1 bg-transparent border-b border-green-700 rounded-none placeholder-white placeholder-opacity-50"
                        />
                        <div>
                          <button
                              className="text-white font-bold border-2 mt-2 w-16 border-green-700 text-sm p-2 m-1"
                              onClick={handleLogin}
                          >
                            Log In
                          </button>
                          <button
                              className="text-white font-bold border-2 mt-2 w-16 border-green-700 text-sm p-2 m-1"
                              onClick={handleLogin}
                          >
                            Register
                          </button>
                        </div>
                      </div>
                  )} 
                </div>
              </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
