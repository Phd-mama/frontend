import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-red-200 text-white py-10 mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* About Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">PhD Mama Indonesia</h3>
            <p className="text-sm mt-2 text-black">
              Empowering women scholars across Indonesia to connect, collaborate, and grow together.
            </p>
            <p className="text-sm font-bold text-black mt-4">
              Contact us: 
              <a href="mailto:contact@phdmama.id" className="text-black ml-1">
                contact@phdmama.id
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 text-center md:text-right">
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-red-400">Home</a></li>
              <li><a href="/explore" className="hover:text-red-400">Explore Experts</a></li>
              <li><a href="/contact" className="hover:text-red-400">Contact Us</a></li>
              <li><a href="/about" className="hover:text-red-400">About Us</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex-1 flex justify-center md:justify-end space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-blue-600">
              <FaLinkedin size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-blue-700">
              <FaFacebook size={24} />
            </a>
            <a href="mailto:contact@phdmama.id" className="text-red-400 hover:text-red-400">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} PhD Mama Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
