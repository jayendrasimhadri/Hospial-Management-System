import { redirect } from "next/navigation";

export default function Login() {
  // Server Action: placeholder until real authentication is added.
  // TODO: verify email/password and create a session before redirecting.
  async function login(formData: FormData) {
    "use server";
    redirect("/");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-blue-900 text-center">Welcome back</h1>
      <p className="text-gray-600 text-center mt-1 mb-6">Log in to your patient account</p>

      <form action={login} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 transition-colors"
        >
          Log In
        </button>
      </form>
    </>
  );
}
