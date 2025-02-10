import { MonitorPlay, BookmarkSimple } from "@phosphor-icons/react";

import { FormSubheader } from "@/components/common";
import { Button } from "@/components/ui";

import PageCard from "@/features/app-settings/components/PageCard";
import { pagesGuide } from "@/features/app-settings/constants/pagesGuide";
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
        {pagesGuide.map((page) => (
          <PageCard
            name={page.name}
            icon={page.icon}
            link={page.link}
            tagLine={page.tagLine}
            key={page.id}
          />
        ))}
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
