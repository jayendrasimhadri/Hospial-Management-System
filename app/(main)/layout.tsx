import SideNavbar from "@/app/components/SideNavbar";
import TopNavbar from "@/app/components/TopNavbar";

// Layout for the logged-in app pages: sidebar + top bar.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <SideNavbar />

      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
