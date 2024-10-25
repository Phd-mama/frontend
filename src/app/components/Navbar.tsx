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
    <nav className="bg-red-200 p-4"> 
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-red-600 cursor-pointer">
            phdmamaindonesia.DB
          </h1>
        </Link>
        <div className="flex space-x-6 items-center">
          <Link
            href="https://phdmamaindonesia.com"
            className="hover:text-black"
          >
            Blogs
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contacts
          </Link>
          <Link href="#" className="hover:text-black">
            Search
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="bg-red-500 text-white p-2 rounded-full"
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
            <Link href="/login" className="hover:text-black">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
