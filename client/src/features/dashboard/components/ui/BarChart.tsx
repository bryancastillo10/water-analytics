import type { INutrientStatsResponse } from "../../api/interface";

interface BarChartProps {
  statData: INutrientStatsResponse;
  loading: boolean;
}

const BarChart = ({ statData, loading }: BarChartProps) => {
  console.log(statData);
  
  if (loading) {
    return (
      <div className="col-span-1 xl:col-span-1  h-[350px] animate-pulse bg-indigo-500">
      </div>
  )};
  
  return (
    <div className="col-span-1 xl:col-span-1  h-[350px] bg-indigo-500">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl">Bar Chart of Nutrients</h1>
          <p className="text-center">
            Average Concentrations of Ammonia, Nitrates, Phosphates
          </p>
        </div>
    </div>
  )
}

export default BarChart;