import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';
import { useAppSelector } from '@/lib/redux/hooks';
import CustomTooltip from '@/features/dashboard/components/tooltips/CustomChartTooltip';

interface TimeSeriesLineChartProps {
  selectedParameter: string;
  timeSeriesData: { date: string; value: number }[];
}

const TimeSeriesLineChart = ({ timeSeriesData, selectedParameter }: TimeSeriesLineChartProps) => {
  const theme = useAppSelector(state => state.theme.isDarkMode);

  return (
    <section className="w-full h-[250px] lg:h-[300px]">
      <ResponsiveContainer className="pt-4" width="100%" height="100%">
        <LineChart
          data={timeSeriesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12, color: theme ? '#ffffff' : '#040710' }} />
          <YAxis
            tick={{ fontSize: 12, color: theme ? '#ffffff' : '#040710' }}
            label={{
              value: selectedParameter,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
            }}
          />
          <Tooltip
            content={<CustomTooltip chartType="line" selectedParameter={selectedParameter} />}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#13b6f6"
            fill="#006da3"
            fillOpacity={0.5}
            dot={{ r: 2 }}
            name={selectedParameter}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default TimeSeriesLineChart;
