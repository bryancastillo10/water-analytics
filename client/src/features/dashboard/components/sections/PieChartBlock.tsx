import { MainPageLoadingState } from "@/components/layout";
import { useGetSitePercentageQuery } from "@/features/dashboard/api/dashboardApi";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

import PieChartHeader from "@/features/dashboard/components/ui/PieChartHeader";
import PieChartToolTip from "@/features/dashboard/components/tooltips/PieChartToolTip";

const PieChartBlock = () => {
  const { data, isLoading } = useGetSitePercentageQuery();
  const COLORS = ['#006da3', '#00C49F', '#F0E442', '#FF8042','#5D3A9B','#8E7A65'];

  const siteData = data?.percentages.map((site) => {
    return {
      sourceType: site.sourceType.toString(),
      percentage: parseFloat(site.percentage)
    }
  }) ?? [];

  if (isLoading) {
    return (
      <div className="col-span-1 h-[350px]">
        <MainPageLoadingState/>
      </div>
    )
  };

  return (
      <div className="col-span-1 h-[350px]">
        <PieChartHeader 
          totalSites={data?.totalSites || "No data retrieved"}
        />
        
        <ResponsiveContainer className="pt-4" width="100%" height="90%">
          <PieChart width={800} height={400}>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
              ))}
            </Pie>
            <Tooltip content={<PieChartToolTip/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
  )
}

export default PieChartBlock;
