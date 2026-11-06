import Image from "next/image";
import Link from "next/link";
import BookAppointmentButton from "@/app/components/BookAppointmentButton";
import { doctors } from "@/app/data/doctors";
import dashboardBanner from "@/public/dashboard banner.jpg";

export default function Home() {
  const availableToday = doctors.filter((doctor) => doctor.availableToday);

  return (
    <>
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={dashboardBanner}
          alt="Doctor holding a stethoscope"
          priority
          className="h-56 w-full object-cover object-left sm:h-72"
        />

        {/* Overlay: top-right corner, on the plain side of the banner */}
        <div className="absolute right-4 top-4 flex max-w-[60%] flex-col items-end gap-4 text-right sm:right-8 sm:top-8">
          <h1 className="text-xl font-bold text-blue-900 sm:text-2xl">
            Welcome to Patient Dashboard!
          </h1>
          <p className="max-w-xs text-sm text-gray-700 sm:text-base">
            Your health, our priority. Book a visit with our trusted doctors in just a
            few clicks.
          </p>
          <BookAppointmentButton />
        </div>
      </div>

      {/* Doctors available today */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-900">
            Available Today{" "}
            <span className="text-base font-medium text-gray-500">
              ({availableToday.length} doctors)
            </span>
          </h2>
          <Link
            href="/bookappointment"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {availableToday.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-gray-900">{doctor.name}</h3>
                <p className="truncate text-sm text-gray-600">{doctor.specialty}</p>
                <p className="mt-1 text-sm">
                  <span className="text-amber-500">★</span> {doctor.rating}
                  <span className="text-gray-400"> · </span>
                  <span className="font-medium">₹{doctor.fee.toLocaleString("en-IN")}</span>
                </p>
              </div>

              <Link
                href="/bookappointment"
                className="shrink-0 rounded-full bg-blue-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-800"
              >
                Book
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
