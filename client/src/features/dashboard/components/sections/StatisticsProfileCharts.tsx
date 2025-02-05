import { useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetParameterProfileStatisticsQuery } from "@/features/dashboard/api/dashboardApi";
import type { IParamStatisticsResponse } from "@/features/dashboard/api/interface";

import BarChart from "@/features/dashboard/components/ui/BarChart";
import GaugeCard from "@/features/dashboard/components/ui/GaugeCard";

const StatisticsProfileCharts = () => {
    const siteId = useAppSelector((state) => state.dashboard.selectedSiteId);
    const safeSiteId = siteId ?? "";
    
    const { data: rawStats, isLoading, refetch } = useGetParameterProfileStatisticsQuery(
        {siteId: safeSiteId, paramgroup: "basic"}, { skip: !siteId });
    
    
    const statsData: IParamStatisticsResponse<string, number>[] = Array.isArray(rawStats) 
        ? rawStats 
        : [{ parameter: "N/A", avgValue: 0, thresholdValue: 0, status: "N/A" }];

    useEffect(() => {
        if (!siteId) return;
        
        const timeout = setTimeout(() => {
            refetch();
        }, 2500);
        
        return () => clearTimeout(timeout);
    }, [rawStats, siteId]);
    
         
    return (
      <>
        <BarChart
            statData={statsData}
            loading={isLoading}
        />
        <div className="flex flex-col gap-2">
            {statsData.map((param) => (
                <GaugeCard
                    key={param.parameter}
                    {...param}
                />
            ))}
        </div>
     </>
  )
}

export default StatisticsProfileCharts;
