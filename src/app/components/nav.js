"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Nav = ({ cookieStore }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  console.log(cookieStore);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <nav className="bg-green-600 border-b-4 border-white">
      <div className="flex flex-wrap max-w-screen-xl items-center justify-between mx-auto p-2">
        <div className="rounded-lg hover:bg-green-500 w-48">
          <a href="" className="flex items-center space-x-1 relative">
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
        <div className="rounded-lg hover:bg-green-500">
          {cookieStore.length !== 0 ? (
            <a
              className="group flex items-center space-x-3 rtl:space-x-reverse relative"
              onClick={openModal}
            >
              <img src="/profile.svg" className="h-14" alt="LiveShots" />
            </a>
          ) : (
            <div className="border-2 border-white p-2 rounded-lg">
              <button className="text-white font-bold" onClick={() => signIn()}>
                Sign in
              </button>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div className="fixed flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="flex flex-col items-center border border-orange-500 rounded-lg p-8 rounded-lg">
              <h1>Profile:</h1>
              <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
