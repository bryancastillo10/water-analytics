import { Outlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setIsSidebarExpanded } from "@/lib/redux/states/sidebarSlice";

import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";

const AppLayout = () => {
  const dispatch = useAppDispatch()
  const isSidebarExpanded = useAppSelector((state) => state.sidebar.isSidebarExpanded);

  const toggleSidebar = () => {
    dispatch(setIsSidebarExpanded(!isSidebarExpanded));
  };

  return (
    <main className="flex bg-light w-full h-screen">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1">
        <Navbar
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <section className="py-3 px-6">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default AppLayout;
