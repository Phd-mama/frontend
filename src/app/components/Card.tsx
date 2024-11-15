import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "../types/types";

interface CardProps {
  expert: Profile;
}

const Card: React.FC<CardProps> = ({ expert }) => {
  return (
    <Link href={`/explore/${expert.user}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-full">
        {expert.photo_url ? (
          <Image
            src={expert.photo_url}
            alt={expert.name}
            width={120}
            height={120}
            className="mx-auto rounded-full mb-4"
          />
        ) : (
          <BiUserCircle className="mx-auto w-28 h-28 text-gray-400 mb-4" />
        )}
        
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-medium text-gray-800">{expert.name}</h3>
          <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-xs">
            {expert.expertise?.slice(0, 3).map((exp, index) => (
              <span
                key={index}
                className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md whitespace-nowrap"
              >
                {exp.name}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {expert.short_bio ? (expert.short_bio.length > 50 ? `${expert.short_bio.slice(0, 50)}...` : expert.short_bio) : "No bio available"}
        </p>

        <div className="flex justify-center space-x-6 mt-6">
          {expert.instagram && (
            <a href={expert.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 text-xl">
              <FaInstagram />
            </a>
          )}
          {expert.linkedin && (
            <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 text-xl">
              <FaLinkedin />
            </a>
          )}
          {expert.twitter && (
            <a href={expert.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 text-xl">
              <FaTwitter />
            </a>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
