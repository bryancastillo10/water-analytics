import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/hooks";

import AppLogo from "@/assets/water.png";
import { sidebarItems, type sidebarItemsProps } from "@/components/navigation/sidebarItems";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";

export interface NavigationProps{
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  theme?: boolean;
  toggleTheme?: () => void;
}

// Sidebar children component
const SideBarRowItem = ({ name, icon: Icon,link, isSidebarExpanded, theme }: sidebarItemsProps) => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const role = user.role.toLowerCase();
  
  const isActive = location.pathname === `/${role}${link}` || location.pathname === "/dashboard";

  return (
      <Link to={`/${role}${link}`}>
      <li className={`${isActive ? "bg-primary" : null} 
      ${isSidebarExpanded ? "my-4 w-fit":"w-full my-3 gap-2"}
      flex justify-start  items-center p-2  rounded-2xl`}>
        <Icon size="28" color={isActive ? "#F4F3F2" : theme ? "#13b6f6":"#040710"} />
      {isSidebarExpanded ? null: <span className={`${isActive ? "text-white font-semibold" : theme ? "text-secondary":"text-dark"}`}>
        {name}
        </span>} 
      </li>
      </Link>
  )
};

// Sidebar parent component
const Sidebar = ({ isSidebarExpanded, toggleSidebar, theme }: NavigationProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <nav
      className={`fixed xl:static z-40 flex flex-col transform transition-width duration-500 
      overflow-hidden h-full shadow-lg 
      ${theme ? "bg-darkGray text-secondary":"bg-light text-dark"}
      ${isSidebarExpanded ? "w-0 md:w-14" : "w-48"}
      `}
    >
      <div className={`relative py-8 ${isSidebarExpanded ? "px-2" : "px-4"} flex-grow`}>
        {/* Sidebar Header */}
        <div className="flex justify-start gap-2 items-center">
          <img src={AppLogo} alt="logo" className={`${isSidebarExpanded ? "mt-8" : "mt-0"} size-10`} />
          {!isSidebarExpanded && (
            <h1 className="text-xl tracking-wider text-left font-secondary">Water Analytics</h1>
          )}
        </div>
        <div className="absolute top-4 right-4 cursor-pointer hover:text-primary" onClick={toggleSidebar}>
          {isSidebarExpanded ? <ArrowCircleRight size="24" /> : <ArrowCircleLeft size="24" />}
        </div>
        {/* Sidebar Items */}
        <ul className="h-full mt-10">
          {sidebarItems.map((items) => (
            <SideBarRowItem
              key={items.id}
              id={items.id}
              name={items.name}
              link={items.link}
              icon={items.icon}
              isSidebarExpanded={isSidebarExpanded}
              theme={theme!}
            />
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className={`p-4 text-center  ${isSidebarExpanded ? "hidden" : "block"}`}>
        <p className="text-xs">&copy; {currentYear} Water Analytics</p>
      </div>
    </nav>
  );
};

export default Sidebar;