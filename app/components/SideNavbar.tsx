import Link from "next/link";
import Image from "next/image";

const SideNavbar = () => {
    return (
        <aside className="w-50 h-screen sticky top-0 self-start shrink-0 overflow-y-auto bg-blue-900 text-white p-5 flex flex-col">

      <div className="mb-10">
        <Image
          src="/logo-nobg-white.png"
          alt="MediCare logo"
          width={160}
          height={92}
          className="object-contain"
          priority
        />
      </div>

      <nav className="flex-1 flex flex-col gap-5 text-white">

        <Link href="/" className="hover:text-blue-200">
          Dashboard
        </Link>

        <Link href="/appointment" className="hover:text-blue-200">
          My Appointments
        </Link>

        <Link href="/bookappointment" className="hover:text-blue-200">
          Book Appointment
        </Link>

        <Link href="/records/101" className="hover:text-blue-200">
          Medical Records
        </Link>

      </nav>

      <Link href="/logout" className="hover:text-blue-200 mt-50">
        Logout
      </Link>

    </aside>
    );

};

export default SideNavbar;
