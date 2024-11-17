import { useLocation } from "react-router-dom";
import { List, Moon } from "@phosphor-icons/react";

import { sidebarItems } from "@/components/navigation/sidebarItems";
import {type NavigationProps} from "@/components/navigation/Sidebar";

const Navbar = ({isSidebarExpanded, toggleSidebar}: NavigationProps) => {
  const location = useLocation();


  const currentPage = sidebarItems.find(
    (item) => location.pathname === `/role${item.link}` || location.pathname === "/dashboard"
  )?.name || "Dashboard";

  return (
    <nav className="sticky z-20 top-0 bg-primary text-light px-6 py-4">
      <section className="flex items-center justify-between">
      {/* Left Side */}
      <div className="flex gap-x-3">
      {isSidebarExpanded &&  ( <><div onClick={toggleSidebar}  className="cursor-pointer md:hidden hover:scale-90 duration-150">
            <List size="24" />
          </div>
          </>)}
          <h1 className="text-lg md:text-xl font-secondary hidden md:block">{currentPage}</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-x-3">
          {/* Theme Toggle */}
          <div className="cursor-pointer hover:scale-90">
            <Moon size="28" weight="fill"/>
          </div>

          {/* Username Greetings */}
          <div className="grid-cols-1  items-center">
            <h1 className="font-secondary">Welcome</h1>
            <p className="text-sm text-neutral">username</p>
          </div>
          <hr className="h-10 border border-light" />

          <div className="flex items-center gap-x-3">      
          {/* Avatar */}
          <img
            className="size-10 rounded-full"
            src="https://i.pravatar.cc/150?img=55"
            alt="avatar"
            />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
