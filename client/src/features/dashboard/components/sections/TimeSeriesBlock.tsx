import useTimeSeriesFilter from "@/features/dashboard/hooks/useTimeSeriesFilter";
import { DrawerLoadingState } from "@/components/layout";

import TimeSeriesFilter from "@/features/dashboard/components/ui/TimeSeriesFilter";
import TimeSeriesLineChart from "@/features/dashboard/components/ui/TimeSeriesLineChart";

const TimeSeriesBlock = () => {
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
        <TimeSeriesLineChart
            timeSeriesData={processedTimeSeriesData}
            selectedParameter={selectedParameter}
        />
    </div>
  )
}

export default TimeSeriesBlock;
