import {  ResponsiveContainer,Pie, PieChart, Cell } from "recharts";
import Needle from "@/features/dashboard/components/tooltips/Needle";

interface GaugeChartProps<T> {
    percentage: string;
    cx?: T;
    cy?: T;
    innerRad?: T;
    outerRad?: T;
    radian: T;
}

const GaugeChart = (props: GaugeChartProps<number>) => {
    const
    { percentage,
      cx = 100,
      cy = 100,
      innerRad = 60,
      outerRad = 90,
      radian
    } = props;
    
  const percentageValue = parseFloat(percentage); 
  const totalValue = 100; 
  const filledValue = Math.min(percentageValue, totalValue); 
  const remainingValue = totalValue - filledValue;

  const data = [
    { name: "Filled", value: filledValue },
    { name: "Remaining", value: remainingValue },
  ];

  const COLORS = ["#006da3", "#13b6f650"]; 
    
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
          <svg>
            <Needle
              value={filledValue} 
              data={data} 
              radian={radian} 
              cx={cx} 
              cy={cy} 
              innerRad={innerRad} 
              outerRad={outerRad} 
              color="#545454"
            />
          </svg>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default GaugeChart;
