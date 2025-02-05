import {
  ResponsiveContainer,
  BarChart as BarChartRecharts,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  Cell,
} from "recharts";
import { CustomSelect } from "@/components/ui";
import { LoadingBlock } from "@/components/common";

import BarChartToolTip from "@/features/dashboard/components/tooltips/BarChartToolTip";
import { colorTheme } from "@/features/dashboard/utils/colorTheme";

import type { IParamStatisticsResponse } from "@/features/dashboard/api/interface";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";
import { YAxisLabel } from "@/features/dashboard/utils/formatYAxisLabel";

interface BarChartProps {
  statData: IParamStatisticsResponse<string,number>[];
  loading: boolean;
  selectLabel: string;
  options: string[];
  selectParameterGroup: (label: string) => void;
}

const BarChart = (props: BarChartProps) => {
  const { statData, selectLabel, loading, options, selectParameterGroup } = props;
  
  if (loading) {
    return <LoadingBlock layoutClassName="col-span-1" />;
  }

  const barData = statData.map((stat) => ({
    parameter: formatLabel(stat.parameter),
    avgValue: stat.avgValue,
  }));

  return (
      <div className="col-span-1 xl:col-span-1 h-[350px]">
        <div className="grid grid-cols-1 items-center mx-2 mb-4">
          <h1 className="text-md font-semibold mr-1">Parameter Profile</h1>
          <div className="col-span-2">
            <CustomSelect
              label={loading ? "Loading..." : selectLabel}
              placeholder="Select a category"
              options={options}
              onChangeValue={selectParameterGroup}
            />
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChartRecharts
          width={500}
          height={300}
          data={barData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            className="text-sm"
            dataKey="parameter"
            interval={0}
            textAnchor="middle"
          />
          <YAxis label={{
            value: YAxisLabel(selectLabel),
            angle: -90,
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize:12 }
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
