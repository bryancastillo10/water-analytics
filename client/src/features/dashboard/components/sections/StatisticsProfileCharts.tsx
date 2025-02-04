import { useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetNutrientStatsQuery } from "@/features/dashboard/api/dashboardApi";

import BarChart from "@/features/dashboard/components/ui/BarChart";
import GaugeCard from "@/features/dashboard/components/ui/GaugeCard";


const StatisticsProfileCharts = () => {
    const siteId = useAppSelector((state) => state.dashboard.selectedSiteId);
    const safeSiteId = siteId ?? "";
    
    const { data: rawStats, isLoading, refetch } = useGetNutrientStatsQuery(safeSiteId, { skip: !siteId });
    
    useEffect(() => {
        if (!siteId) return;
        
        const timeout = setTimeout(() => {
            refetch();
        }, 2500);
        
        return () => clearTimeout(timeout);
    }, [rawStats, siteId]);
    
    
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
