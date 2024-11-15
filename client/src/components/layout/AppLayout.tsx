import { Outlet } from "react-router-dom";

import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";

const AppLayout = () => {
  return (
    <main className="flex bg-white w-full h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <section className="py-3 px-6">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default AppLayout;
