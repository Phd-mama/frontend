"use client";
import Navbar from "../components/Navbar";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Expert {
	name: string;
	expertise: string;
	bio: string;
	photo_url?: string;
	instagram?: string;
	linkedin?: string;
	twitter?: string;
}

const LandingPage: React.FC = () => {
	const [experts, setExperts] = useState<Expert[]>([]);

	useEffect(() => {
		const fetchExperts = async () => {
			try {
				const response = await fetch("/api/experts");
				const data = await response.json();
				setExperts(data);
			} catch (error) {
				console.error("Error fetching experts data:", error);
			}
		};
		fetchExperts();
	}, []);

	return (
		<div className="bg-white text-black min-h-screen">
			<Navbar />
			<header className="bg-pink-500 py-20 text-center">
				<h1 className="text-4xl font-bold text-white">
					EMPOWERING KNOWLEDGE. CONNECTING EXPERTS
				</h1>
				<button className="mt-8 bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
					JOIN US
				</button>
			</header>

			<section className="bg-gray-200 py-20">
				<h2 className="text-4xl text-center font-bold text-whitetext-4xltext-black">
					Find Indonesia&apos;s Leading PhD Woman Experts
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
					{experts.map((expert, index) => (
						<div
							key={index}
							className="bg-white p-4 rounded-lg shadow-lg text-center"
						>
							{expert.photo_url ? (
								<Image
									src={expert.photo_url}
									alt={expert.name}
									width={100}
									height={100}
									className="mx-auto rounded-full mb-4"
								/>
							) : (
								<BiUserCircle className="mx-auto w-24 h-24 text-gray-400 mb-4" />
							)}
							<h3 className="text-xl font-semibold text-gray-800">
								{expert.name}
							</h3>
							<p className="text-gray-600">{expert.expertise}</p>
							<p className="text-sm text-gray-500">{expert.bio}</p>
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
					))}
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
