import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetSiteStatSummaryQuery } from "@/features/dashboard/api/dashboardApi";

const useRadarStat = () => {
    const [selectedStat, setSelectedStat] = useState<string>("average");
    
    const statTypeOptions = ["Average", "Maximum", "Minimum"];
    const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId);
    const safeSiteId = siteId ?? "";
    
    
    const { data : rawStat, isLoading } = useGetSiteStatSummaryQuery({
        siteId: safeSiteId,
        statType: selectedStat.toLowerCase()
    });
    
    const handleChangeSelectStat = (stat: string) => {
        const formatStat = stat.toLowerCase();
        setSelectedStat(formatStat);
    };
    
    return {
        rawStat,
        isLoading,
        selectedStat,
        statTypeOptions,
        handleChangeSelectStat
    };
}

export default useRadarStat;
