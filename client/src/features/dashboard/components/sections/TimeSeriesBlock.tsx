import useTimeSeriesFilter from '@/features/dashboard/hooks/useTimeSeriesFilter';
import TimeSeriesFilter from '@/features/dashboard/components/ui/TimeSeriesFilter';
import TimeSeriesLineChart from '@/features/dashboard/components/ui/TimeSeriesLineChart';
import { LoadingBlock } from '@/components/common';

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
    handleSelectedDate,
  } = useTimeSeriesFilter();

  if (timeSeriesLoading) {
    return (
      <LoadingBlock layoutClassName="col-span-1 sm:col-span-2 xl:col-span-2 w-full min-h-[200px]" />
    );
  }

  return (
    <div className="col-span-1 sm:col-span-2 xl:col-span-2 w-full min-h-[200px]">
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
  );
};

export default TimeSeriesBlock;
