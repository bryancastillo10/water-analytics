import { FormSubheader } from "@/components/common";
import { MonitorPlay, Key } from "@phosphor-icons/react";

import { featuresList } from "@/features/app-settings/constants/features";

const AppInfoForm = () => {
  return (
    <section className="grid grid-cols-1">
      
      {/* App Overview */}
      <FormSubheader icon={MonitorPlay}  text="Overview" />
      <p className="text-justify indent-4 leading-normal text-sm w-[90%]">
        <span className="font-semibold tracking-wide">Water Analytics</span> is a full-stack web application
        designed to modernize water quality management through
        data-driven insights and interactive features.
        Developed by Bryan Castillo, this project highlights
        his ability to integrate complex functionalities into an intuitive, user-friendly
        interface blending some expertise in environmental engineering
        with a passion for technological innovation.</p>
      
      {/* Key Features */}
    <FormSubheader icon={Key} text="Key Features" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {featuresList.map((feature) => (
        <div
          key={feature.id}
          className="p-4 rounded-md border border-gray-200 hover:border-gray-300 transition-colors duration-200"
        >
          <h1 className="font-medium text-lg tracking-normal text-gray-900">
            {feature.title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{feature.description}</p>
        </div>
      ))}
    </div>


    </section>
  )
}

export default AppInfoForm;
