"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const Contact: React.FC = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const randomContacts = [
		{
			name: "ABCD",
			phone: "0812-3456-7890",
			email: "ABCD@phdmamaindonesia.com",
		},
	];

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 text-black min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow container mx-auto py-20 px-6 sm:px-8 lg:px-16">
				<div className="bg-white shadow-lg rounded-lg p-8">
					<h1 className="text-4xl font-bold text-pink-600 mb-6">Contact Us</h1>
					<p className="text-lg text-gray-600 mb-10">
						For inquiries, feel free to reach us at{" "}
						<a href="mailto:contact@phdmamaindonesia.com" className="text-blue-500 hover:underline">
							contact@phdmamaindonesia.com
						</a>
					</p>

					<div className="border-t-2 border-pink-200 my-8"></div>

					<h2 className="text-2xl font-semibold text-gray-700">Our Team</h2>
					<ul className="mt-8 space-y-6">
						{randomContacts.map((contact, index) => (
							<li
								key={index}
								className="bg-pink-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
							>
								<p className="text-lg font-semibold text-gray-800">
									<strong>Name:</strong> {contact.name}
								</p>
								<p className="text-lg text-gray-700">
									<strong>Phone:</strong> {contact.phone}
								</p>
								<p className="text-lg text-gray-700">
									<strong>Email:</strong>{" "}
									<a
										href={`mailto:${contact.email}`}
										className="text-blue-500 hover:underline"
									>
										{contact.email}
									</a>
								</p>
							</li>
						))}
					</ul>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Contact;
