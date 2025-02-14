import { useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetParameterProfileStatisticsQuery } from "@/features/dashboard/api/dashboardApi";
import type { IParamStatisticsResponse } from "@/features/dashboard/api/interface";

import BarChart from "@/features/dashboard/components/ui/BarChart";
import GaugeCard from "@/features/dashboard/components/ui/GaugeCard";

import useParameterGroupSelection from "@/features/dashboard/hooks/useParameterGroupSelection";

const StatisticsProfileCharts = () => {
    const siteId = useAppSelector((state) => state.dashboard.selectedSiteId);
    const safeSiteId = siteId ?? "";
    
    const { selectedLabel, selectedValue, paramGroupOptions, selectParameterGroup } = useParameterGroupSelection();
    
    const { data: rawStats, isLoading, refetch } = useGetParameterProfileStatisticsQuery(
        {siteId: safeSiteId, paramgroup: selectedValue}, { skip: !siteId });
    
    
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
      <div className="col-span-1 sm:col-span-2 xl:col-span-2 row-span-1 grid grid-cols-1 xl:grid-cols-2 xl:gap-3 min-h-[400px]">
        <BarChart
            statData={statsData}
            loading={isLoading}
            selectLabel={selectedLabel}
            options={paramGroupOptions}
            selectParameterGroup={selectParameterGroup }  
        />
        <div className="flex flex-wrap justify-center xl:justify-start gap-4 mt-20 xl:mt-0">
                {statsData
                .filter((param) => param.parameter !== "pH")
                .map((param) => (
                <GaugeCard
                    key={param.parameter}
                    loading={isLoading}
                    {...param}
                />
            ))}
        </div>
     </div>
  )
}

export default StatisticsProfileCharts;
