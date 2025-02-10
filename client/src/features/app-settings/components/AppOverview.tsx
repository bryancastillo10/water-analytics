import { MonitorPlay, BookmarkSimple } from "@phosphor-icons/react";

import { FormSubheader } from "@/components/common";
import { Button } from "@/components/ui";
import type { InfoDrawerProps } from "@/features/app-settings/hooks/useAppInfoDrawer";


const AppOverview = ({handleCloseDrawer}: InfoDrawerProps) => {
  return (
    <section className="grid grid-cols-1">   

      <FormSubheader icon={MonitorPlay}  text="Overview" />
      <p className="text-justify indent-4 leading-normal w-[90%]">
        <span className="font-semibold tracking-wide">Water Analytics</span> is a full-stack web application
        designed to modernize water quality management through
        data-driven insights and interactive features.
        Developed by Bryan Castillo, this project highlights
        his ability to integrate complex functionalities into an intuitive, user-friendly
        interface blending some expertise in environmental engineering
        with a passion for technological innovation.</p>
      
      <FormSubheader icon={BookmarkSimple} text="Explore the App" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-4">
        <div className="w-[200px] h-[150px] bg-teal-500"></div>
        <div className="w-[200px] h-[150px] bg-amber-500"></div>
        <div className="w-[200px] h-[150px] bg-indigo-500"></div>
        <div className="w-[200px] h-[150px] bg-yellow-300"></div>
        <div className="w-[200px] h-[150px] bg-cyan-500"></div>
        <div className="w-[200px] h-[150px] bg-stone-500"></div>
      </div>
      <div className="my-8 mx-4">
        <Button
          variant="primary"
        action={handleCloseDrawer}
          width="w-full"
        >
          Got It
        </Button>
    </div>
  </section>
  )
}

export default AppOverview;
