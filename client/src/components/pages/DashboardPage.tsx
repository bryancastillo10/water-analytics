import { CustomSelect } from "@/components/ui";
import { MapPin, Funnel } from "@phosphor-icons/react";
import useSiteQuery from "@/features/dashboard/hooks/useSiteQuery";
import {
  TimeSeriesBlock,
  BarChartBlock,
  PieChartBlock,
  RadarChartBlock,
  DashboardCardBlock
} from "@/features/dashboard/components/sections";

const DashboardPage = () => {
  const { selectedSiteName, siteOptions, getSiteIdByName } = useSiteQuery();

  return (
    <main className="">
      <div className="mb-8 w-full">
          <div className="flex items-center gap-2">
            <Funnel weight="fill" size="20"/> 
            <p className="tracking-wide mb-1">Site</p>

            <div className="w-[50%]">
              <CustomSelect
                label="Monitoring Site"
                icon={MapPin}
                placeholder="Search for the site"
                value={selectedSiteName}
                options={siteOptions}
                onChangeValue={getSiteIdByName}
              />
          </div>
        </div>
        <DashboardCardBlock/>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-3">
        <TimeSeriesBlock/>
        <PieChartBlock />
        <RadarChartBlock />
        <BarChartBlock />
      </div>
    </main>
  );
}

export default DashboardPage;
