import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { Expert } from "../types/expert";

interface CardProps {
	expert: Expert;
}

const Card: React.FC<CardProps> = ({ expert }) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-lg text-center">
			<Image
				src={expert.photo_url || "/images/avatar.png"}
				alt={expert.name}
				width={100}
				height={100}
				className="mx-auto rounded-full mb-4"
			/>
			<h3 className="text-xl font-semibold">{expert.name}</h3>
			<p className="text-gray-500">{expert.expertise}</p>
			<p className="text-sm text-gray-400">{expert.bio}</p>
			<div className="flex justify-center space-x-4 mt-4">
				<a
					href={expert.instagram || "https://instagram.com"}
					className="text-gray-500 hover:text-pink-500"
				>
					<FaInstagram />
				</a>
				<a
					href={expert.linkedin || "https://linkedin.com"}
					className="text-gray-500 hover:text-blue-700"
				>
					<FaLinkedin />
				</a>
				<a
					href={expert.twitter || "https://twitter.com"}
					className="text-gray-500 hover:text-blue-500"
				>
					<FaTwitter />
				</a>
			</div>
		</div>
	);
};

export default Card;
