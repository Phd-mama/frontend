"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setUsername(storedUsername);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  if (!hasMounted) return null;

  return (
    <nav className="bg-pink-300 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-700 cursor-pointer">
          phdmamaindonesia<span className="text-xs align">.DB</span>
        </Link>
        <div className="flex-grow flex justify-center space-x-6">
          <Link href="https://phdmamaindonesia.com" className="text-gray-800 hover:text-pink-700 font-semibold">
            Blogs
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-pink-700 font-semibold">
            Contacts
          </Link>
          <Link href="#" className="text-gray-800 hover:text-pink-700 font-semibold">
            Search
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-800 font-semibold">
                Welcome, {username} ({role})
              </span>
              <div className="relative">
                <button
                  className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FiUser size={24} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    {role !== "admin" && (
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        Edit Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
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
