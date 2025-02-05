import { CustomSelect } from "@/components/ui";
import { Calculator } from "@phosphor-icons/react";

import ChartHeader from "@/features/dashboard/components/ui/ChartHeader";
import useRadarStat from "@/features/dashboard/hooks/useRadarStat";
import RadarChart from "@/features/dashboard/components/ui/RadarChart";

import { LoadingBlock } from "@/components/common";

const RadarChartBlock = () => {
  const { rawStat,
          isLoading,
          selectedStat,
          statTypeOptions,
          handleChangeSelectStat
  } = useRadarStat();
  
  if (isLoading) {
    return (
      <LoadingBlock layoutClassName="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1 h-auto min-h-[250px]" />);
  }
  
  const formatLabel = (selectedStat: string) => {
       return `${selectedStat.charAt(0)?.toUpperCase() ?? ''}${selectedStat.slice(1)?.toLowerCase() ?? ''}`;
  };
  
  return (
    <div className="mt-10 xl:mt-0 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1 h-[320px] mb-20">
      <div className="flex flex-col xl:flex-row items-center w-full gap-2 xl:gap-4">
        <ChartHeader
          h1="Site Profile"
          h2="Data representation"
          icon={Calculator}
        />
        <CustomSelect
          label={isLoading ? "Loading...": formatLabel(selectedStat)}
          options={statTypeOptions}
          width="w-[200px]"
          placeholder="Select Statistics"
          onChangeValue={handleChangeSelectStat}
        />
      </div>
      {rawStat && (<RadarChart rawData={rawStat} />)}
    </div>
  )
}

export default RadarChartBlock;
