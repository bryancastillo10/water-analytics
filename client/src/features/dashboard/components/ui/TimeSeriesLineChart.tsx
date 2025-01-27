import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip } from "recharts";

interface TimeSeriesLineChartProps{
   selectedParameter: string;
   timeSeriesData:  { date: string; value: number }[];
}

const TimeSeriesLineChart = ({
  timeSeriesData,
  selectedParameter
}: TimeSeriesLineChartProps) => {
  return (    
       <ResponsiveContainer className="pt-4" width="100%" height="90%">
        <AreaChart
          data={timeSeriesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ 
              value: selectedParameter, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#F4F3F2',
              border: '1px solid #c2c2c2',
              color:"#040710",
              borderRadius: '4px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#13b6f6"
            fill="#006da3"
            fillOpacity={0.3}
            dot={{ r: 2 }}
            name={selectedParameter}
          />
        </AreaChart>
      </ResponsiveContainer>
  )
}

export default TimeSeriesLineChart;
