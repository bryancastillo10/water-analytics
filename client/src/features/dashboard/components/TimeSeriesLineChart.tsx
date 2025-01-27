import useTimeSeriesFilter from "@/features/dashboard/hooks/useTimeSeriesFilter";
import TimeSeriesFilter from "./TimeSeriesFilter";

const TimeSeriesLineChart = () => {
  const {
    selectedParameter,
    selectedDateRange,
    parameterOptions,
    dateOptions,
    timeSeriesData,
    parameterListLoading,
    dateListLoading,
    timeSeriesLoading,
    handleSelectedParameter,
    handleSelectedDate
  } = useTimeSeriesFilter();
  console.log(timeSeriesData);
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
        <div className="w-full h-[300px] bg-teal-500"/>
    </div>
  )
}

export default TimeSeriesLineChart;
