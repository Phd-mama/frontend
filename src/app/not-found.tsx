import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-pink-500">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">
        This page could not be found.
      </p>
      <Link href="/" className="mt-8 px-6 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600">
        Back to Homepage
      </Link>
    </div>
  );
}
