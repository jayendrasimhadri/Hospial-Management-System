export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";
export type AppointmentMode = "In-person" | "Video call";

export type Appointment = {
  id: number;
  doctorId: number;   // matches Doctor.id in ./doctors
  date: string;       // YYYY-MM-DD
  time: string;       // e.g. "10:00 AM"
  reason: string;
  mode: AppointmentMode;
  status: AppointmentStatus;
};

// Sample data until a real database/API is connected.
export const appointments: Appointment[] = [
  { id: 1, doctorId: 1, date: "2026-11-09", time: "10:00 AM", reason: "Lipid profile review",   mode: "In-person",  status: "Upcoming"  },
  { id: 6, doctorId: 1, date: "2026-10-28", time: "10:30 AM", reason: "Chest pain follow-up",   mode: "In-person",  status: "Completed" },
  { id: 7, doctorId: 7, date: "2026-10-05", time: "12:00 PM", reason: "Routine consultation",   mode: "Video call", status: "Cancelled" },
  { id: 8, doctorId: 8, date: "2026-09-15", time: "03:00 PM", reason: "Seasonal allergy",       mode: "In-person",  status: "Completed" },
  { id: 9, doctorId: 2, date: "2026-08-03", time: "11:00 AM", reason: "Knee pain (right)",      mode: "In-person",  status: "Completed" },
];
