import { Signpost } from "@phosphor-icons/react";
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
import { colorTheme } from "@/features/dashboard/utils/colorTheme";

import type { IParamStatisticsResponse } from "@/features/dashboard/api/interface";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";

interface BarChartProps {
  statData: IParamStatisticsResponse<string,number>[];
  loading: boolean;
}

const BarChart = ({ statData, loading }: BarChartProps) => {
  if (loading) {
    return <LoadingBlock layoutClassName="col-span-1" />;
  }

  const barData = statData.map((stat) => ({
    parameter: formatLabel(stat.parameter),
    avgValue: stat.avgValue,
  }));

  return (
    <div className="col-span-1 xl:col-span-1 h-[350px]">
      <ChartHeader
        h1="Parameter Profile"
        icon={Signpost}
        h2="Select a group"
      />

      <ResponsiveContainer width="100%" height="90%">
        <BarChartRecharts
          width={500}
          height={300}
          data={barData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            className="text-sm"
            dataKey="parameter"
            interval={0}
            textAnchor="middle"
          />
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
