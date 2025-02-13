import { CustomSelect } from "@/components/ui";
import { MapPin, Funnel } from "@phosphor-icons/react";
import useSiteQuery from "@/features/dashboard/hooks/useSiteQuery";
import {
  TimeSeriesBlock,
  StatisticsProfileCharts,
  PieChartBlock,
  RadarChartBlock,
  DashboardCardBlock
} from "@/features/dashboard/components/sections";

const DashboardPage = () => {
  const { selectedSiteName, siteOptions, getSiteIdByName } = useSiteQuery();

  return (
    <main className="">
      <div className="mb-8 w-full">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 w-full items-center">
            <div className="flex place-items-center gap-2">
              <Funnel weight="fill" size="20"/> 
              <p className="tracking-wide mb-1">Site</p>
            </div>
            <div className="w-full my-4">
              <CustomSelect
                label="Monitoring Site"
                icon={MapPin}
                width="w-full xl:w-[45%]"
                placeholder="Search for the site"
                value={selectedSiteName || "No Site Selected"}
                options={siteOptions}
                onChangeValue={getSiteIdByName}
              />
          </div>
        </div>
        {/* <DashboardCardBlock/> */}
      </div>
<div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
  <TimeSeriesBlock/>
  {/* <section className="col-span-1 sm:col-span-2 xl:col-span-2 w-full bg-primary/90 min-h-[200px]" /> */}

  <PieChartBlock />
  {/* <section className="col-span-1 sm:col-span-1 xl:col-span-1 row-span-1 h-auto min-h-[250px] bg-amber-500"/> */}

  {/* <RadarChartBlock /> */}
  <section className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1 h-auto min-h-[300px] bg-cyan-700"/>

  {/* <StatisticsProfileCharts /> */}
  <section className="col-span-1 sm:col-span-2 xl:col-span-2 row-span-1 grid grid-cols-1 xl:grid-cols-2 gap-y-12 xl:gap-4 bg-rose-500 min-h-[300px]" />
</div>


    </main>
  );
}

export default DashboardPage;
