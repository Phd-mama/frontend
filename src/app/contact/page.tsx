import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
const Contact: React.FC = () => {
	const randomContacts = [
		{
			name: "ABCD",
			phone: "0812-3456-7890",
			email: "ABCD@phdmamaindonesia.com",
		},
	];

	return (
		<div className="bg-white text-black min-h-screen">
			<Navbar />
			<div className="container mx-auto py-20">
				<h1 className="text-3xl font-bold text-gray-700">Contact Us</h1>
				<p className="mt-4 text-gray-600">
					You can reach us at contact@phdmamaindonesia.com
				</p>
				<br />
				<h2 className="text-xl font-bold text-gray-700">OR</h2>
				<h2 className="text-2xl font-bold mt-10">ADMIN</h2>
				<ul className="mt-4 space-y-4">
					{randomContacts.map((contact, index) => (
						<li
							key={index}
							className="bg-white text-black p-4 rounded-lg shadow-md"
						>
							<p>
								<strong>Name:</strong> {contact.name}
							</p>
							<p>
								<strong>Phone:</strong> {contact.phone}
							</p>
							<p>
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
		</div>
	);
};

export default Contact;
