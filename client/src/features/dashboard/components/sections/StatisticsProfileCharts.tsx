import { useAppSelector } from "@/lib/redux/hooks";
import { useGetNutrientStatsQuery } from "@/features/dashboard/api/dashboardApi";

import BarChart from "@/features/dashboard/components/ui/BarChart";
import GaugeChart from "@/features/dashboard/components/ui/GaugeChart";


const StatisticsProfileCharts = () => {
    const siteId = useAppSelector((state) => state.dashboard.selectedSiteId);
    const safeSiteId = siteId ?? "";
    
    const { data: rawStats, isLoading } = useGetNutrientStatsQuery(safeSiteId, { skip: !siteId });
    
    const statData = rawStats ?? {
        siteName: "No site name",
        nutrientStatus: []
    };
    return (
      <>
        <BarChart
            statData={statData}
            loading={isLoading}
        />
        <GaugeChart/>
     </>
  )
}

export default StatisticsProfileCharts;
