import Image from "next/image";

// Layout for login/logout: no sidebar or top bar, just a centered card.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-nobg.png"
            alt="MediCare logo"
            width={180}
            height={103}
            priority
          />
        </div>
        {children}
      </div>
    </div>
  );
}
