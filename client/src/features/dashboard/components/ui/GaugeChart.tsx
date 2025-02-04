import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";

interface GaugeChartProps {
    name: string;
    percentage: string;
    status: string;
}

const GaugeChart = ({name, percentage, status}: GaugeChartProps) => {
  return (
    <div>
        {percentage}
    </div>
  )
}

export default GaugeChart;
