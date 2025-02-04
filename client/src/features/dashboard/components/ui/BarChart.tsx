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
import ChartHeader from "@/features/dashboard/components/ui/ChartHeader";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";
import { colorTheme } from "@/features/dashboard/utils/colorTheme";

interface BarChartProps {
  statData: INutrientStatsResponse;
  loading: boolean;
}

const BarChart = ({ statData, loading }: BarChartProps) => {
  if (loading) {
    return <LoadingBlock layoutClassName="col-span-1" />;
  }

  const siteName = statData.siteName;


  const barData = statData.nutrientStatus.map((stat) => ({
    parameter: formatLabel(stat.nutrient),
    avgValue: stat.avgValue,
  }));

  return (
    <div className="col-span-1 xl:col-span-1 h-[350px]">
      <ChartHeader
        h1="Nutrients Profile"
        icon={MapPinArea}
        h2={siteName}
      />

      <ResponsiveContainer width="100%" height="90%">
        <BarChartRecharts
          width={500}
          height={300}
          data={barData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="parameter" />
          <YAxis label={{
            value: "Concentration (mg/L)",
            angle: -90,
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
           }} />
          <Tooltip content={<BarChartToolTip/>} />
            <Bar
              dataKey="avgValue"
              radius={[10, 10, 0, 0]}
              activeBar={<Rectangle fill="#13b6f6" fillOpacity={0.8} />}
            >
            {barData.map((_, index) => (
              <Cell
                key={`cell-${index}`} fill={colorTheme[index % colorTheme.length]} />
            ))}
          </Bar>
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
