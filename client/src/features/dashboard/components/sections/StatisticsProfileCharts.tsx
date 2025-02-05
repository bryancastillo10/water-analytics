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
      <div className="col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-y-12 xl:gap-4">
        <BarChart
            statData={statsData}
            loading={isLoading}
            selectLabel={selectedLabel}
            options={paramGroupOptions}
            selectParameterGroup={selectParameterGroup }  
        />
        <div className="flex flex-col gap-2 mt-8 xl:mt-0">
            {statsData.map((param) => (
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
