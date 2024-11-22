import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setIsSidebarExpanded } from "@/lib/redux/states/sidebarSlice";

import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import Drawer from "@/components/navigation/Drawer";

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
      <div className="flex-1 flex flex-col md:pl-12 xl:pl-0">
        <Navbar
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <section className="flex-1 overflow-auto py-3 px-6">       
          <Drawer/>
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default AppLayout;
