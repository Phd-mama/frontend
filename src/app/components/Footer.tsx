import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-pink-300 text-gray-800 py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-pink-700">PhD Mama Indonesia</h3>
          <p className="text-sm mt-2">
            Empowering women scholars across Indonesia to connect, collaborate, and grow together.
          </p>
          <p className="text-sm font-bold mt-4">
            Contact us:{" "}
            <a
              href="mailto:contact@phdmama.id"
              className="text-pink-700 hover:text-pink-600"
            >
              contact@phdmama.id
            </a>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-lg font-semibold text-pink-700">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="/"
                className="text-gray-800 hover:text-pink-600 font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/explore"
                className="text-gray-800 hover:text-pink-600 font-medium"
              >
                Explore Experts
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-800 hover:text-pink-600 font-medium"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-800 hover:text-pink-600 font-medium"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-end space-x-4">
          {[
            { href: "https://instagram.com", icon: <FaInstagram /> },
            { href: "https://twitter.com", icon: <FaTwitter /> },
            { href: "https://linkedin.com", icon: <FaLinkedin /> },
            { href: "https://facebook.com", icon: <FaFacebook /> },
            { href: "mailto:contact@phdmama.id", icon: <FaEnvelope /> },
          ].map(({ href, icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-700 hover:text-black transition transform hover:scale-110"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-400 mt-8 pt-4 text-center">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PhD Mama Indonesia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
