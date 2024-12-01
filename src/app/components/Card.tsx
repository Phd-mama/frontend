import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import ConversationLogo from "../public/assets/images/the_conversations.png";
import { Profile } from "../types/types";

interface CardProps {
  expert: Profile;
}

const Card: React.FC<CardProps> = ({ expert }) => {
  return (
    <Link href={`/explore/${expert.user}`}>
      <div className="bg-gradient-to-br from-white to-pink-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-full border border-gray-200 hover:border-pink-400">
          {/* Avatar */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            {expert.profile_picture ? (
              <img
                src={`${expert.profile_picture}.jpg`}
                alt={expert.name || "Expert Avatar"}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <BiUserCircle className="w-32 h-32 text-gray-400" />
            )}
          </div>


        {/* Name and Expertise */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">{expert.name}</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {expert.expertise?.slice(0, 3).map((exp, index) => (
              <span
                key={index}
                className="inline-block bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
              >
                {exp.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-600 text-center leading-relaxed">
          {expert.short_bio
            ? expert.short_bio.length > 60
              ? `${expert.short_bio.slice(0, 60)}...`
              : expert.short_bio
            : "No bio available"}
        </p>

        {/* Social Media */}
        <div className="flex justify-center space-x-4 mt-6">
          {expert.instagram && (
            <a
              href={expert.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition hover:scale-110"
            >
              <FaInstagram />
            </a>
          )}
          {expert.linkedin && (
            <a
              href={expert.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition hover:scale-110"
            >
              <FaLinkedin />
            </a>
          )}
          {expert.twitter && (
            <a
              href={expert.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition hover:scale-110"
            >
              <FaTwitter />
            </a>
          )}
          {expert.the_conversation && (
            <a
              href={expert.the_conversation}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Image
                src={ConversationLogo}
                alt="The Conversation Indonesia"
                width={22}
                height={24}
              />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6">
          <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-all text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
