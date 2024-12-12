import { useState } from "react";
import { useLocation } from "react-router-dom";
import { List, Moon, Sun } from "@phosphor-icons/react";

import { sidebarItems } from "@/components/navigation/sidebarItems";
import AvatarPopOver from "@/components/navigation/AvatarPopOver";
import { type NavigationProps } from "@/components/navigation/Sidebar";

import { useAppSelector } from "@/lib/redux/hooks";

const Navbar = ({
  isSidebarExpanded,
  theme,
  toggleSidebar,
  toggleTheme
}: NavigationProps) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const togglePopOver = () => {
    setIsPopOverOpen(!isPopOverOpen);
  }

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
          <div onClick={toggleTheme} className="cursor-pointer hover:scale-90">
            {theme ? <Sun size="28" weight="fill" />: <Moon size="28" weight="fill"/>}
          </div>

          {/* Username Greetings */}
          <div className="grid-cols-1  items-center">
            <h1 className="font-secondary">Welcome</h1>
            <p className="text-sm text-neutral">{user.username || "username"}</p>
          </div>
          <hr className="h-10 border border-light" />

          <div className="relative flex items-center gap-x-3">      
          {/* Avatar */}
            <img
              onClick={togglePopOver}
              className="size-10 rounded-full cursor-pointer duration-300 ease-in-out hover:scale-90"
              src={user.profilePic || "https://i.pravatar.cc/150?img=55"}
              alt="avatar"
              />
           {isPopOverOpen && <AvatarPopOver/>}
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
