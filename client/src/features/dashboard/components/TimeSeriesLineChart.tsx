import { useGetTimeSeriesQuery } from "../api/dashboardApi";
import { useAppSelector } from "@/lib/redux/hooks";

import { CustomSelect } from "@/components/ui";

const TimeSeriesLineChart = () => {
  const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId);
  const { data } = useGetTimeSeriesQuery({
    id: siteId!,
    parameter: "pH"
  });

  console.log(data);
  return (
    <div className="col-span-1 xl:col-span-2 bg-teal-500">
        <div className="flex flex-col items-center h-full">
        <CustomSelect
          label="Parameter"
          placeholder="Select a water quality parameter"
          value="pH"
          options={["pH", "dissolvedOxygen", "totalCOD"]}
          onChangeValue={()=>{}}
        />
        </div>
    </div>
  )
}

export default TimeSeriesLineChart;
