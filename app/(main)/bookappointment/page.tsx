import React from 'react'
import Image from 'next/image';
import { doctors, type Doctor } from '@/app/data/doctors';

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => {
      // fill: 1 = full, between 0 and 1 = partial, 0 = empty
      const fill = Math.max(0, Math.min(1, rating - (n - 1)));
      return (
        <span key={n} className="relative inline-block w-4 h-4 text-gray-300">
          <svg viewBox="0 0 20 20" fill="currentColor" className="absolute inset-0 w-4 h-4">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
          </span>
        </span>
      );
    })}
  </div>
);

const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
    <div className="relative aspect-square bg-gray-100">
      <Image
        src={doctor.image}
        alt={doctor.name}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-top"
      />
    </div>

    <div className="p-4 flex flex-col flex-1">
      <h2 className="text-lg font-semibold text-gray-900">{doctor.name}</h2>
      <p className="text-sm text-gray-600">
        {doctor.specialty} · {doctor.experience} yrs exp
      </p>

      <div className="flex items-center gap-2 mt-2">
        <Stars rating={doctor.rating} />
        <span className="text-sm text-blue-700">{doctor.reviews.toLocaleString("en-IN")}</span>
      </div>

      <p className="mt-3">
        <span className="text-xs align-top">₹</span>
        <span className="text-2xl font-semibold">{doctor.fee.toLocaleString("en-IN")}</span>
        <span className="text-sm text-gray-500"> / consultation</span>
      </p>

      <p className={`text-sm mt-1 font-medium ${doctor.availableToday ? "text-green-700" : "text-orange-600"}`}>
        {doctor.availableToday ? "Available today" : "Next available: tomorrow"}
      </p>

      {/* mt-auto pushes the button to the bottom so all cards line up */}
      <div className="mt-auto pt-4">
        <button
          type="button"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-full py-2 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  </div>
);

const BookAppointments = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-900">Book Appointment</h1>
      <p className="text-gray-600 mt-1 mb-6">Choose a doctor to book your consultation.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </>
  )
}

export default BookAppointments;
