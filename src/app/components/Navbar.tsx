"use client"; 

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi"; 

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-pink-300 p-4 shadow-md"> 
      <div className="container mx-auto flex justify-between">
        <Link href="/">
        <h1 className="text-2xl font-bold text-pink-700 cursor-pointer">
          phdmamaindonesia
          <span className="text-xs align">.DB</span> 
        </h1>
        </Link>
        <div className="flex space-x-6 items-center">
          <Link
            href="https://phdmamaindonesia.com"
            className="text-gray-800 hover:text-pink-700 font-semibold" 
          >
            Blogs
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-pink-700 font-semibold">
            Contacts
          </Link>
          <Link href="#" className="text-gray-800 hover:text-pink-700 font-semibold">
            Search
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700"  
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FiUser size={24} /> 
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-gray-800 hover:text-pink-700 font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
