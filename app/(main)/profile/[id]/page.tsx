import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

type Patient = {
  name: string;
  photo: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  address: string;
  allergies: string;
  emergencyContact: { name: string; relation: string; phone: string };
};

// Sample data until a real database/API is connected.
const patients: Record<string, Patient> = {
  "101": {
    name: "Rahul Sharma",
    photo: "/doctor1.jpeg",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1995-04-12",
    gender: "Male",
    bloodGroup: "B+",
    height: "175 cm",
    weight: "72 kg",
    address: "12, MG Road, chennai, Tamil Nadu, India",
    allergies: "Penicillin",
    emergencyContact: { name: "Priya Sharma", relation: "Spouse", phone: "+91 91234 56789" },
  },
};

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getAge = (iso: string) => {
  const dob = new Date(iso + "T00:00:00");
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthday =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthday) age--;
  return age;
};

// Age depends on today's date, so compute it at request time
// (the rest of the page stays prerendered).
const Age = async ({ dob }: { dob: string }) => {
  await connection();
  return <> ({getAge(dob)} yrs)</>;
};

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <dt className="text-sm text-gray-500">{label}</dt>
    <dd className="mt-1 font-medium text-gray-900">{value}</dd>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-lg border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-blue-900 mb-4">{title}</h2>
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">{children}</dl>
  </section>
);

// Pre-build a page for each known patient ID (required with cacheComponents).
export function generateStaticParams() {
  return Object.keys(patients).map((id) => ({ id }));
}

export default async function Profile(props: PageProps<"/profile/[id]">) {
  const { id } = await props.params;
  const patient = patients[id];

  if (!patient) notFound();

  return (
    <>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Profile</h1>

      {/* Header card */}
      <div className="bg-blue-900 text-white rounded-lg p-6 flex items-center gap-6 mb-6">
        <Image
          src={patient.photo}
          alt={patient.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border-4 border-white"
        />
        <div>
          <p className="text-2xl font-bold">{patient.name}</p>
          <p className="text-blue-200">Patient ID: {id}</p>
          <span className="inline-block mt-2 bg-white text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
            Blood Group {patient.bloodGroup}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Section title="Personal Information">
          <Field label="Full Name" value={patient.name} />
          <Field
            label="Date of Birth"
            value={
              <>
                {formatDate(patient.dateOfBirth)}
                <Suspense fallback={null}>
                  <Age dob={patient.dateOfBirth} />
                </Suspense>
              </>
            }
          />
          <Field label="Gender" value={patient.gender} />
          <Field label="Blood Group" value={patient.bloodGroup} />
        </Section>

        <Section title="Contact Details">
          <Field label="Email" value={patient.email} />
          <Field label="Phone" value={patient.phone} />
          <div className="sm:col-span-2">
            <Field label="Address" value={patient.address} />
          </div>
        </Section>

        <Section title="Medical Details">
          <Field label="Height" value={patient.height} />
          <Field label="Weight" value={patient.weight} />
          <Field label="Allergies" value={patient.allergies} />
        </Section>

        <Section title="Emergency Contact">
          <Field label="Name" value={patient.emergencyContact.name} />
          <Field label="Relation" value={patient.emergencyContact.relation} />
          <Field label="Phone" value={patient.emergencyContact.phone} />
        </Section>
      </div>
    </>
  );
}
