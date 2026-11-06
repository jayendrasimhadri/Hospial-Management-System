import Link from "next/link";
import Image from "next/image";

const TopNavbar = () => {
  return (
    <header className="h-16 sticky top-0 z-10 bg-white border-b border-gray-200 px-6 flex items-center justify-end gap-6">

      {/* Notification bell */}
      <button
        type="button"
        aria-label="Notifications"
        className="relative text-gray-600 hover:text-blue-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        {/* Unread dot */}
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
      </button>

      {/* Profile picture */}
      <Link href="/profile/101" aria-label="Profile">
        <Image
          src="/doctor1.jpeg"
          alt="Profile picture"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-900"
        />
      </Link>

    </header>
  );
};

export default TopNavbar;
