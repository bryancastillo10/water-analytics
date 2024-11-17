import { useLocation, Link } from "react-router-dom";
import AppLogo from "@/assets/water.png";
import { sidebarItems, type sidebarItemsProps } from "@/components/navigation/sidebarItems";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";

export interface NavigationProps{
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

// Sidebar children component
const SideBarRowItem = ({ name, icon: Icon,link, isSidebarExpanded }: sidebarItemsProps) => {
  const location = useLocation();
  
  const isActive = location.pathname === `/role${link}` || location.pathname === "/dashboard";

  return (
      <Link to={`/role${link}`}>
      <li className={`${isActive ? "bg-primary" : null} 
      ${isSidebarExpanded ? "my-4 w-fit":"w-full my-3 gap-2"}
      flex justify-start  items-center p-2  rounded-2xl`}>
      <Icon size="28" color={isActive ? "#F4F3F2" : "#040710"} />
      {isSidebarExpanded ? null: <span className={`${isActive ? "text-white font-semibold" : "text-dark"}`}>
        {name}
        </span>} 
      </li>
      </Link>
  )
};

// Sidebar parent component
const Sidebar = ({ isSidebarExpanded, toggleSidebar }: NavigationProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <nav
      className={`fixed xl:static z-40 flex flex-col transition-all duration-500 
      overflow-hidden h-full shadow-lg  bg-light
      ${isSidebarExpanded ? "w-0 md:w-14" :"w-48"}
      `}
    >
      <div className={`relative py-8 ${isSidebarExpanded ?"px-2":"px-4"}`}>
        {/* Sidebar Header */}
        <div className="flex justify-start gap-2 items-center">
          <img src={AppLogo} alt="logo" className={`${isSidebarExpanded ? "mt-8":"mt-0"} size-10`} />
          {!isSidebarExpanded && (<h1 className="text-xl tracking-wider text-left font-secondary">Water Analytics</h1>)}
        </div>
        <div className="absolute top-4 right-4 cursor-pointer hover:text-primary" onClick={toggleSidebar}>
          {isSidebarExpanded ? <ArrowCircleRight size="24"/>: <ArrowCircleLeft size="24" />}
        </div>
        {/* Sidebar Items */}
        <ul className="h-full mt-10 ">
          {sidebarItems.map((items) => (
            <SideBarRowItem
              key={items.id}
              id={items.id}
              name={items.name}
              link={items.link}
              icon={items.icon}
              isSidebarExpanded={isSidebarExpanded}
            />
         ))}
        </ul>
        
        {/* Sidebar Footer */}
        <div className={`${isSidebarExpanded ? "hidden" : "block"} mt-12 xl:mt-32`}>
          <p className={`p-2 text-center text-medium ${isSidebarExpanded ? "block" : "hidden"}`}>&copy;</p>
          <p className="text-xs text-dark">&copy; {currentYear} Water Analytics</p>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;