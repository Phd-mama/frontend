import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-pink-300 text-gray-800 py-10 mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* About Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-pink-700">PhD Mama Indonesia</h3> 
            <p className="text-sm mt-2 text-gray-700">
              Empowering women scholars across Indonesia to connect, collaborate, and grow together.
            </p>
            <p className="text-sm font-bold text-gray-700 mt-4">
              Contact us: 
              <a href="mailto:contact@phdmama.id" className="text-pink-700 ml-1 hover:text-pink-600">
                contact@phdmama.id
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 text-center md:text-right">
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-800 hover:text-pink-600 font-semibold">Home</a></li>
              <li><a href="/explore" className="text-gray-800 hover:text-pink-600 font-semibold">Explore Experts</a></li>
              <li><a href="/contact" className="text-gray-800 hover:text-pink-600 font-semibold">Contact Us</a></li>
              <li><a href="/about" className="text-gray-800 hover:text-pink-600 font-semibold">About Us</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex-1 flex justify-center md:justify-end space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-700 hover:text-black">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-pink-700 hover:text-black">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-pink-700 hover:text-black">
              <FaLinkedin size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-700 hover:text-black">
              <FaFacebook size={24} />
            </a>
            <a href="mailto:contact@phdmama.id" className="text-pink-700 hover:text-black">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-400 mt-8 pt-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} PhD Mama Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
