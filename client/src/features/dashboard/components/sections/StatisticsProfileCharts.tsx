import { useAppSelector } from "@/lib/redux/hooks";
import { useGetNutrientStatsQuery } from "@/features/dashboard/api/dashboardApi";

import BarChart from "@/features/dashboard/components/ui/BarChart";
import GaugeCard from "@/features/dashboard/components/ui/GaugeCard";


const StatisticsProfileCharts = () => {
    const siteId = useAppSelector((state) => state.dashboard.selectedSiteId);
    const safeSiteId = siteId ?? "";
    
    const { data: rawStats, isLoading } = useGetNutrientStatsQuery(safeSiteId, { skip: !siteId });
    
    const statsDataWithSiteName = rawStats ?? {
        siteName: "No site name",
        nutrientStatus: []
    };
    
    const nutrientData = statsDataWithSiteName.nutrientStatus;
        
    return (
      <>
        <BarChart
            statData={statsDataWithSiteName}
            loading={isLoading}
        />
        <div className="flex flex-col gap-2">
            {nutrientData.map((nutri) => (
                <GaugeCard
                    key={nutri.nutrient}
                    {...nutri}
                />
            ))}
        </div>
     </>
  )
}

export default StatisticsProfileCharts;
