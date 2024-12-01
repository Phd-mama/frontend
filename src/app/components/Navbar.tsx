"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setUsername(storedUsername);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);

    toast.success("You have successfully logged out!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <>
      <nav className="sticky top-0 bg-pink-300 p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
            <div className="flex items-center space-x-4">
            <Link href="/explore" className="text-2xl font-bold text-pink-700 flex items-center mb-1">
              phdmamaindonesia<span className="text-xs align-super">.DB</span>
            </Link>

            {/* Smaller Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
              href="https://phdmamaindonesia.com"
              className="text-sm text-gray-800 hover:text-pink-700 font-medium transition-colors"
              >
              Blogs
              </Link>
              <Link
              href="/contact"
              className="text-sm text-gray-800 hover:text-pink-700 font-medium transition-colors"
              >
              Contacts
              </Link>
              <Link
              href="/explore"
              className="text-sm text-gray-800 hover:text-pink-700 font-medium transition-colors"
              >
              Find Experts
              </Link>
            </div>
            </div>

          {/* User Dropdown */}
          <div className="relative">
            {isLoggedIn ? (
              <>
                <button
                  className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition"
                  onClick={() => setShowUserDropdown((prev) => !prev)}
                >
                  <FiUser size={24} />
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    {role === "admin" ? (
                      <Link
                        href="/dashboardadmin"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
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
              </>
            ) : (
              <Link
                href="/login"
                className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
