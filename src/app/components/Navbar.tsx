import Link from "next/link";

const Navbar: React.FC = () => {
	return (
		<nav className="bg-pink-200 p-4">
			<div className="container mx-auto flex justify-between">
				<Link href="/">
					<h1 className="text-2xl font-bold text-red-600 cursor-pointer">
						phdmamaindonesia.DB
					</h1>
				</Link>
				<div className="flex space-x-6">
					<Link
						href="https://phdmamaindonesia.com"
						className="hover:text-black"
					>
						Blogs
					</Link>
					<Link href="/contact" className="hover:text-black">
						Contacs
					</Link>
					<Link href="#" className="hover:text-black">
						Search
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
