import { LoadingBlock } from "@/components/common";
import type { NutrientStatResult } from "@/features/dashboard/api/interface";

interface GaugeChartProps {
  statData: NutrientStatResult<string, number>[];
  loading: boolean;
};

const GaugeChart = ({ statData, loading }: GaugeChartProps) => {
  
  console.log("Gauge Chart Data", statData);
  
  if (loading) {
    return (
      <LoadingBlock layoutClassName="col-span-1 xl:col-span-1"/>
  )}
  return (
    <div className="col-span-1 xl:col-span-1  h-[350px] bg-teal-500">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl">Gauge Chart of Nutrients</h1>
          <p className="text-center">
            Indicating the threshold versus avg value comparison
          </p>
        </div>
    </div>
  )
}

export default GaugeChart;
