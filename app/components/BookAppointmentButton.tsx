import Link from "next/link";

// Navigation-only button: a styled <Link> works without "use client".
const BookAppointmentButton = () => {
  return (
    <Link
      href="/bookappointment"
      className="inline-flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors">
      Book Appointment
    </Link>
  );
};

export default BookAppointmentButton;
