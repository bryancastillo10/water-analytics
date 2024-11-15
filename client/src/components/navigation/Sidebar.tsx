import AppLogo from "@/assets/water.png";
import { ArrowCircleLeft } from "@phosphor-icons/react";

import { ChartLine, GridFour,MapPin,Gear } from "@phosphor-icons/react";

const Sidebar = () => {
  return (
    <nav
      className="flex flex-col transition-all duration-500 
      overflow-hidden h-full shadow-lg   bg-light w-48"
    >
      <div className="relative py-8 px-4">
        {/* Sidebar Header */}
        <div className="flex justify-start gap-2 items-center">
          <img src={AppLogo} alt="logo" className="size-10" />
          <h1 className="text-lg text-left font-bold">Water Analytics</h1>
        </div>
        <div className="absolute top-6 right-4">
          <ArrowCircleLeft size="24" />
        </div>
        {/* Sidebar Items */}
        <div className="mt-10">
          <div className="flex justify-start items-center gap-2 bg-primary p-2 my-3 rounded-2xl hover:rounded-lg">
            <ChartLine size="28" color="#F4F3F2" />
            <p className="font-semibold text-white">Dashboard</p>
          </div>

          {/* Sidebar Inactive */}
          <div className="flex justify-start items-center gap-2 p-2 my-3 rounded-2xl">
            <GridFour size="28" color="#040710" />
            <p className="font-semibold text-dark">Data Table</p>
          </div>

          <div className="flex justify-start  items-center gap-2 p-2 my-3 rounded-2xl">
            <MapPin size="28" color="#040710" />
            <p className="font-semibold text-dark">Sites</p>
          </div>

          <div className="flex justify-start items-center gap-2 p-2 my-3 rounded-2xl">
            <Gear size="28" color="#040710" />
            <p className="font-semibold text-dark">Settings</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;