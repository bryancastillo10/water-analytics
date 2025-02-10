import { FormSubheader } from "@/components/common";
import { MonitorPlay, BookmarkSimple } from "@phosphor-icons/react";


const AppOverview = () => {
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
      
      <FormSubheader icon={BookmarkSimple} text="Pages" />
    </section>
  )
}

export default AppOverview;
