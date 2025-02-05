import type { ISiteStatResponse, StatType } from "@/features/dashboard/api/interface";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";
import {
  ResponsiveContainer,
  Radar,
  RadarChart as RadarRecharts,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

interface RadarChartProps {
  rawData: ISiteStatResponse<number>;
}


const RadarChart = ({ rawData }: RadarChartProps) => {
  const dynamicKey = (Object.keys(rawData.result)[0] as StatType) ?? "average";
  const chartData = rawData.result[dynamicKey] ?? {};

  const radarData = Object.entries(chartData).map(([key, value]) => ({
    parameter: formatLabel(key),
    value: value ?? 0,
  }));

  return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarRecharts cx={190} cy={180} outerRadius="90%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis 
                dataKey="parameter"
                tick={{ fontSize: 12 }}
            />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar
            name={dynamicKey.charAt(0).toUpperCase() + dynamicKey.slice(1)}
            dataKey="value"
            stroke="#13b6f6"
            fill="#006da3"
            fillOpacity={0.6}
            />
        </RadarRecharts>
      </ResponsiveContainer>
  );
};

export default RadarChart;
