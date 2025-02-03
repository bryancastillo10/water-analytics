import { MapPinArea } from "@phosphor-icons/react";
import type { INutrientStatsResponse } from "@/features/dashboard/api/interface";
import { LoadingBlock } from "@/components/common";

import {
  ResponsiveContainer,
  BarChart as BarChartRecharts,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Rectangle,
  Cell,
} from "recharts";

import BarChartToolTip from "@/features/dashboard/components/tooltips/BarChartToolTip";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";

interface BarChartProps {
  statData: INutrientStatsResponse;
  loading: boolean;
}

const BarChart = ({ statData, loading }: BarChartProps) => {
  if (loading) {
    return <LoadingBlock layoutClassName="col-span-1" />;
  }

  const siteName = statData.siteName;

  const COLORS = ["#006da3", "#00C49F", "#F0E442", "#FF5733", "#8A2BE2"]; // Dynamic colors


  const barData = statData.nutrientStatus.map((stat) => ({
    parameter: formatLabel(stat.nutrient),
    avgValue: stat.avgValue,
  }));

  return (
    <div className="col-span-1 xl:col-span-1 h-[350px]">
      <section className="flex flex-col gap-x-2 mb-2">
        <h1 className="text-md font-semibold tracking-wide">Nutrients Profile</h1>
        <div className="flex justify-start items-center gap-4">
          <h1 className="flex items-center gap-1 text-sm mt-1">
            <MapPinArea size="20" />
            {siteName}
          </h1>
        </div>
      </section>

      <ResponsiveContainer width="100%" height="90%">
        <BarChartRecharts
          width={500}
          height={300}
          data={barData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="parameter" />
            <YAxis />
          <Tooltip content={<BarChartToolTip/>} />
            <Bar
              dataKey="avgValue"
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#13b6f6" fillOpacity={0.8} />}
            >
            {barData.map((_, index) => (
              <Cell
                key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
