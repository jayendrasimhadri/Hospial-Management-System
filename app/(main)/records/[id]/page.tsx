import { notFound } from "next/navigation";

type RecordType = "Consultation" | "Lab Report" | "Prescription" | "Imaging";
type RecordStatus = "Completed" | "Pending";

type MedicalRecord = {
  id: number;
  date: string; // YYYY-MM-DD
  type: RecordType;
  title: string;
  details: string;
  doctor: string;
  status: RecordStatus;
};

type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  until: string; // YYYY-MM-DD
};

type PatientRecords = {
  name: string;
  records: MedicalRecord[];
  medications: Medication[];
};

// Sample data until a real database/API is connected.
const recordsByPatient: Record<string, PatientRecords> = {
  "101": {
    name: "Rahul Sharma",
    records: [
      { id: 1, date: "2026-11-02", type: "Lab Report",   title: "Lipid Profile",            details: "Fasting blood sample", doctor: "Dr. Robert Miller", status: "Pending" },
      { id: 2, date: "2026-10-28", type: "Consultation", title: "Chest pain follow-up",     details: "BP 128/84, ECG advised", doctor: "Dr. Robert Miller", status: "Completed" },
      { id: 3, date: "2026-10-28", type: "Imaging",      title: "ECG",                      details: "Normal sinus rhythm", doctor: "Dr. Robert Miller", status: "Completed" },
      { id: 4, date: "2026-09-15", type: "Prescription", title: "Seasonal allergy",         details: "Antihistamine, 30 days", doctor: "Dr. Nisha Verma", status: "Completed" },
      { id: 5, date: "2026-08-03", type: "Consultation", title: "Knee pain (right)",        details: "Mild strain, physiotherapy advised", doctor: "Dr. Daniel Carter", status: "Completed" },
      { id: 6, date: "2026-08-03", type: "Imaging",      title: "X-Ray — Right Knee",       details: "No fracture detected", doctor: "Dr. Daniel Carter", status: "Completed" },
      { id: 7, date: "2026-06-20", type: "Lab Report",   title: "Complete Blood Count (CBC)", details: "All values within range", doctor: "Dr. Arjun Mehta", status: "Completed" },
      { id: 8, date: "2026-06-20", type: "Consultation", title: "Annual health check-up",   details: "General physical examination", doctor: "Dr. Arjun Mehta", status: "Completed" },
    ],
    medications: [
      { name: "Atorvastatin",  dosage: "10 mg",  frequency: "Once daily, at night",   prescribedBy: "Dr. Robert Miller", until: "2027-01-28" },
      { name: "Vitamin D3",    dosage: "60,000 IU", frequency: "Once a week",         prescribedBy: "Dr. Arjun Mehta",   until: "2026-12-20" },
    ],
  },
};

const typeStyles: Record<RecordType, string> = {
  "Consultation": "bg-blue-100 text-blue-800",
  "Lab Report":   "bg-purple-100 text-purple-800",
  "Prescription": "bg-green-100 text-green-800",
  "Imaging":      "bg-amber-100 text-amber-800",
};

const statusStyles: Record<RecordStatus, string> = {
  "Completed": "bg-green-100 text-green-800",
  "Pending":   "bg-yellow-100 text-yellow-800",
};

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-2xl font-bold text-blue-900">{value}</p>
  </div>
);

// Pre-build a page for each known patient ID (required with cacheComponents).
export function generateStaticParams() {
  return Object.keys(recordsByPatient).map((id) => ({ id }));
}

export default async function Records(props: PageProps<"/records/[id]">) {
  const { id } = await props.params;
  const patient = recordsByPatient[id];

  if (!patient) notFound();

  // Newest first
  const records = [...patient.records].sort((a, b) => b.date.localeCompare(a.date));
  const lastVisit = records.find((r) => r.type === "Consultation");
  const pendingCount = records.filter((r) => r.status === "Pending").length;

  return (
    <>
      <h1 className="text-2xl font-bold text-blue-900">Medical Records</h1>
      <p className="text-gray-600 mt-1 mb-6">
        {patient.name} · Patient ID: {id}
      </p>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Records" value={records.length} />
        <StatCard label="Last Visit" value={lastVisit ? formatDate(lastVisit.date) : "—"} />
        <StatCard label="Active Medications" value={patient.medications.length} />
        <StatCard label="Pending Reports" value={pendingCount} />
      </div>

      {/* Records table */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">History</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Doctor</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t border-gray-200 even:bg-gray-50 hover:bg-blue-50">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(r.date)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${typeStyles[r.type]}`}>
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{r.title}</p>
                    <p className="text-sm text-gray-500">{r.details}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.doctor}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      disabled={r.status === "Pending"}
                      className="text-sm font-medium text-blue-900 hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Current medications */}
      <section>
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Current Medications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patient.medications.map((m) => (
            <div key={m.name} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-lg font-semibold text-gray-900">{m.name}</p>
                <p className="text-sm font-medium text-blue-900">{m.dosage}</p>
              </div>
              <p className="text-gray-700 mt-1">{m.frequency}</p>
              <p className="text-sm text-gray-500 mt-3">
                Prescribed by {m.prescribedBy} · until {formatDate(m.until)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
