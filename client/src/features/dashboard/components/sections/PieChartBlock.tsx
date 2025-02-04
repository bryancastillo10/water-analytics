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
import ChartHeader from "../ui/ChartHeader";
import { MapPin } from "@phosphor-icons/react";

const PieChartBlock = () => {
  const { data, isLoading, refetch } = useGetSitePercentageQuery();
  const COLORS = ['#006da3', '#00C49F', '#F0E442', '#FF8042','#5D3A9B','#8E7A65'];

  const siteData = data?.percentages.map((site) => {
    return {
      sourceType: site.sourceType.toString(),
      percentage: parseFloat(site.percentage)
    }
  }) ?? [];

  useEffect(() => {
    refetch();
  }, [data]);

  if (isLoading) {
    return (
      <div className="col-span-1 h-[350px]">
        <MainPageLoadingState/>
      </div>
    )
  };

  return (
      <div className="col-span-1 h-[350px]">
        <ChartHeader
          h1="Distribution of Water Sources Across Sites"
          icon={MapPin}
          h2= "Total Sites"
          totalSites={data?.totalSites || "No data found"}
        />
        <ResponsiveContainer className="pt-4" width="100%" height="90%">
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
                fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<PieChartToolTip/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
  )
}

export default PieChartBlock;
