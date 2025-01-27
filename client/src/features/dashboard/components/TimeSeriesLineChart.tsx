import { useGetParameterFiltersQuery, useGetTimeSeriesQuery } from "../api/dashboardApi";
import { useAppSelector } from "@/lib/redux/hooks";
import TimeSeriesFilter from "./TimeSeriesFilter";

const TimeSeriesLineChart = () => {
  const { data: parameterList } = useGetParameterFiltersQuery();

  const parameterOptions = parameterList || ["pH"];

  const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId);
  const { data } = useGetTimeSeriesQuery({
    id: siteId!,
    parameter: "pH"
  });

  console.log(data);
  return (
    <div className="col-span-1 xl:col-span-2 w-full">
        <TimeSeriesFilter
            parameterOptions={parameterOptions}
        />
        <div className="w-full h-[300px] bg-teal-500"/>
    </div>
  )
}

export default TimeSeriesLineChart;
