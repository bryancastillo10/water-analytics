import { useGetTimeSeriesQuery } from "../api/dashboardApi";
import { useAppSelector } from "@/lib/redux/hooks";

import { CustomSelect } from "@/components/ui";
import { Funnel, Drop, CalendarDot, CalendarDots } from "@phosphor-icons/react";

const TimeSeriesLineChart = () => {
  const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId);
  const { data } = useGetTimeSeriesQuery({
    id: siteId!,
    parameter: "pH"
  });

  console.log(data);
  return (
    <div className="col-span-1 xl:col-span-2">
      <div className="flex mx-4 gap-4 items-center">
          <Funnel weight="fill" size="20"/> 
          <CustomSelect
            label="Parameter"
            icon={Drop}
            placeholder="Select a water quality parameter"
            value="pH"
            options={["pH", "dissolvedOxygen", "totalCOD"]}
            onChangeValue={()=>{}}
          />
          <p className="text-xs">from</p>
          <CustomSelect
            label="Parameter"
            icon={CalendarDot}
            placeholder="Select a water quality parameter"
            value="2023-1-10"
            options={["2023-1-10", "dissolvedOxygen", "totalCOD"]}
            onChangeValue={()=>{}}
          />
          <p className="text-xs">to</p>
          <CustomSelect
            label="Parameter"
            icon={CalendarDots}
            placeholder="Select a water quality parameter"
            value="2023-10-31"
            options={["2023-1-10", "dissolvedOxygen", "totalCOD"]}
            onChangeValue={()=>{}}
          />
        </div>
        <div className="w-full h-[300px] bg-teal-500"/>
    </div>
  )
}

export default TimeSeriesLineChart;
