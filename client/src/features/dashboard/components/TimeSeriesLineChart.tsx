import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip } from "recharts";
import useTimeSeriesFilter from "@/features/dashboard/hooks/useTimeSeriesFilter";
import TimeSeriesFilter from "@/features/dashboard/components/TimeSeriesFilter";
import { DrawerLoadingState } from "@/components/layout";

const TimeSeriesLineChart = () => {
  const {
    selectedParameter,
    selectedDateRange,
    parameterOptions,
    dateOptions,
    processedTimeSeriesData,
    parameterListLoading,
    dateListLoading,
    timeSeriesLoading,
    handleSelectedParameter,
    handleSelectedDate
  } = useTimeSeriesFilter();

  if (timeSeriesLoading) {
    return (
      <div className="flex justify-items-center items-center col-span-1 xl:col-span-2 w-full h-[350px]">
        <DrawerLoadingState />
      </div>)
  }

  return (
    <div className="col-span-1 xl:col-span-2 w-full">
        <TimeSeriesFilter
            selectedParameter={selectedParameter}
            selectedDateRange={selectedDateRange}
            parameterOptions={parameterOptions || []}
            dateOptions={dateOptions || []}
            parameterListLoading={parameterListLoading}
            dateListLoading={dateListLoading}
            handleSelectedParameter={handleSelectedParameter}
            handleSelectedDate={handleSelectedDate}
        />
       <ResponsiveContainer className="pt-4" width="100%" height="90%">
        <AreaChart
          data={processedTimeSeriesData}
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
    </div>
  )
}

export default TimeSeriesLineChart;
