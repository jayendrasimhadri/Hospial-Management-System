import Image from "next/image";
import BookAppointmentButton from "@/app/components/BookAppointmentButton";
import { appointments, type Appointment, type AppointmentStatus } from "@/app/data/appointments";
import { doctors } from "@/app/data/doctors";

// Dates are stored as YYYY-MM-DD; read them as UTC so the day never shifts.
const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const fmt = (iso: string, options: Intl.DateTimeFormatOptions) =>
  toDate(iso).toLocaleDateString("en-IN", { timeZone: "UTC", ...options });

const statusStyles: Record<AppointmentStatus, string> = {
  Upcoming: "bg-blue-50 text-blue-800 ring-blue-200",
  Completed: "bg-green-50 text-green-800 ring-green-200",
  Cancelled: "bg-red-50 text-red-700 ring-red-200",
};

const AppointmentCard = ({ appt }: { appt: Appointment }) => {
  const doctor = doctors.find((d) => d.id === appt.doctorId);
  const isUpcoming = appt.status === "Upcoming";

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center ${
        appt.status === "Cancelled" ? "opacity-70" : ""
      }`}
    >
      {/* Date block */}
      <div
        className={`flex w-20 shrink-0 flex-col items-center rounded-lg py-2 ${
          isUpcoming ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        <span className="text-xs font-medium uppercase">{fmt(appt.date, { month: "short" })}</span>
        <span className="text-2xl font-bold leading-tight">{fmt(appt.date, { day: "2-digit" })}</span>
        <span className="text-xs">{fmt(appt.date, { weekday: "short" })}</span>
      </div>

      {/* Doctor + details */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {doctor && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image src={doctor.image} alt={doctor.name} fill sizes="48px" className="object-cover object-top" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">{doctor?.name ?? "Doctor"}</h3>
          <p className="truncate text-sm text-gray-600">
            {doctor?.specialty} · {appt.reason}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-700">
            <span>🕒 {appt.time}</span>
            <span>{appt.mode === "Video call" ? "🎥 Video call" : "🏥 In-person"}</span>
          </p>
        </div>
      </div>

      {/* Status + actions */}
      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[appt.status]}`}>
          {appt.status}
        </span>
        {isUpcoming && (
          // TODO: wire these to Server Actions once the database is connected.
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-blue-900 px-3 py-1 text-sm font-medium text-blue-900 transition-colors hover:bg-blue-50"
            >
              Reschedule
            </button>
            <button
              type="button"
              className="rounded-full border border-red-300 px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, accent }: { label: string; value: number; accent: string }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4">
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`mt-1 text-3xl font-bold ${accent}`}>{value}</p>
  </div>
);

const Appointments = () => {
  const upcoming = appointments
    .filter((a) => a.status === "Upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = appointments
    .filter((a) => a.status !== "Upcoming")
    .sort((a, b) => b.date.localeCompare(a.date));
  const next = upcoming[0]; // only the soonest upcoming appointment is shown

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Appointments</h1>
          <p className="mt-1 text-gray-600">Track your upcoming visits and appointment history.</p>
        </div>
        <BookAppointmentButton />
      </div>

      {/* Summary */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Upcoming" value={upcoming.length} accent="text-blue-900" />
        <StatCard label="Completed" value={past.filter((a) => a.status === "Completed").length} accent="text-green-700" />
        <StatCard label="Cancelled" value={past.filter((a) => a.status === "Cancelled").length} accent="text-red-700" />
      </div>

      {/* Upcoming: single next appointment */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-blue-900">Upcoming appointment</h2>
        {next ? (
          <AppointmentCard appt={next} />
        ) : (
          <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            No upcoming appointments. Book one to get started.
          </p>
        )}
      </section>

      {/* Past */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-blue-900">Past appointments</h2>
        <div className="flex flex-col gap-3">
          {past.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Appointments;
