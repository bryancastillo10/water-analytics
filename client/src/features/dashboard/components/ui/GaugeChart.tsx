import {  ResponsiveContainer,Pie, PieChart, Cell, Tooltip } from "recharts";

import Needle from "@/features/dashboard/components/tooltips/Needle";
import CustomTooltip from "@/features/dashboard/components/tooltips/CustomChartTooltip";

interface GaugeChartProps<T> {
    percentage: string;
    cx?: T;
    cy?: T;
    innerRad?: T;
    outerRad?: T;
    radian: T;
    theme?: boolean;
}

const GaugeChart = (props: GaugeChartProps<number>) => {
    const
    { percentage,
      cx = 100,
      cy = 100,
      innerRad = 60,
      outerRad = 90,
      radian,
      theme = false,
    } = props;
    
  const percentageValue = parseFloat(percentage); 
  const totalValue = 100; 
  const filledValue = Math.min(percentageValue, totalValue); 
  const remainingValue = totalValue - filledValue;

  const data = [
    { name: "Loading", value: filledValue },
    { name: "Limit", value: remainingValue },
  ];

  const COLORS = ["#006DA3", "#13B6F650"]; 
    
  return (
    <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={120}>
           <Pie
              data={data}
              startAngle={180} 
              endAngle={0} 
              cx={cx}
              cy={cy} 
              innerRadius={innerRad}
              outerRadius={outerRad}
              dataKey="value"
          >
              {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
          </Pie>
          <Tooltip content={<CustomTooltip chartType="gauge" />} />
          <svg>
            <Needle
              value={filledValue} 
              data={data} 
              radian={radian} 
              cx={cx} 
              cy={cy} 
              innerRad={innerRad} 
              outerRad={outerRad} 
              color={theme ? "#C2C2C2": "#545454"}
            />
          </svg>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default GaugeChart;
