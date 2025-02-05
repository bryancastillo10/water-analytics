import { useEffect } from "react";
import { MainPageLoadingState } from "@/components/layout";
import { useGetSitePercentageQuery } from "@/features/dashboard/api/dashboardApi";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

import PieChartToolTip from "@/features/dashboard/components/tooltips/PieChartToolTip";
import ChartHeader from "@/features/dashboard/components/ui/ChartHeader";
import { MapPin } from "@phosphor-icons/react";
import { colorTheme } from "@/features/dashboard/utils/colorTheme";

const PieChartBlock = () => {
  const { data, isLoading, refetch } = useGetSitePercentageQuery();

  const siteData = data?.percentages.map((site) => {
    return {
      sourceType: site.sourceType.toString(),
      percentage: parseFloat(site.percentage)
    }
  }) ?? [];

  useEffect(() => {
      const timeout = setTimeout(() => {
            refetch();
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, [data]);

  if (isLoading) {
    return (
      <div className="col-span-1 sm:col-span-1 xl:col-span-1 row-span-1 h-auto min-h-[250px]">
        <MainPageLoadingState/>
      </div>
    )
  };

  return (
      <div className="mt-10 xl:mt-0 col-span-1 sm:col-span-1 xl:col-span-1 row-span-1 h-[300px]">
        <ChartHeader
          h1="Distribution of Water Sources Across Sites"
          icon={MapPin}
          h2= "Total Sites"
          totalSites={data?.totalSites || "No data found"}
        />
        <ResponsiveContainer width="100%" height="90%">
          <PieChart
            key={siteData.length}
            width={800}
            height={400}
          >
            <Pie
              data={siteData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#006da3"
              paddingAngle={5}
              dataKey="percentage"
            >
            {siteData.map((_, index) => (
              <Cell
                className="hover:drop-shadow-lg 
                          hover:translate-x-[8px] 
                          hover:translate-y-[4px] duration-500 ease-out"
                key={`cell-${index}`}
                fill={colorTheme[index % colorTheme.length]} />
              ))}
            </Pie>
            <Tooltip content={<PieChartToolTip/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
  )
}

export default PieChartBlock;
