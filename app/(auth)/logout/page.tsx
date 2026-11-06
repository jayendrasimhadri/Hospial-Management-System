import Link from "next/link";

export default function Logout() {
  // TODO: clear the user's session here once authentication is added.
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-blue-900">You&apos;ve been logged out</h1>
      <p className="text-gray-600 mt-2 mb-6">Thanks for using MediCare. See you soon!</p>

      <Link
        href="/login"
        className="inline-block w-full bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 transition-colors"
      >
        Log In Again
      </Link>
    </div>
  );
}
