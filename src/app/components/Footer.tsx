import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-red-200 text-black py-8 mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold">PhD Mama Indonesia</h3>
            <p className="text-sm mt-2">
              Empowering women scholars across Indonesia to connect, collaborate, and grow together.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-900 mt-6 pt-4">
          <p className="text-xs text-black">&copy; {new Date().getFullYear()} PhD Mama Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
