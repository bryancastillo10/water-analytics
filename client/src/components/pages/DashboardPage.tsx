import DashboardCard from "@/features/dashboard/components/DashboardCard";
import { statisticsCard } from "@/features/dashboard/api/mockData";
import { NutrientsBarChart, PieChart, RadarChart, TimeSeriesLineChart } from "@/features/dashboard";

import { CustomSelect } from "@/components/ui";
import { MapPin, Funnel } from "@phosphor-icons/react";
import useSiteQuery from "@/features/dashboard/hooks/useSiteQuery";


const DashboardPage = () => {
  const { selectedSite, siteNames, getSiteIdByName } = useSiteQuery();

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
                value={selectedSite}
                options={siteNames}
                onChangeValue={getSiteIdByName}
              />
          </div>
        </div>
        <div className="grid gap-y-4 grid-cols-1 mt-4 md:grid-cols-2 xl:grid-cols-4 sm:place-items-center xl:place-items-start gap-8">
        {statisticsCard.map((item) => (
          <DashboardCard
            key={item.id}
            id={item.id}
            parameter={item.parameter}
            icon={item.icon}
            value={item.value}
            unit={item.unit}
          />
        ))}
      </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-3">
        <TimeSeriesLineChart />
        <PieChart />
        <RadarChart />
        <NutrientsBarChart/>
      </div>
    </main>
  );
}

export default DashboardPage;
