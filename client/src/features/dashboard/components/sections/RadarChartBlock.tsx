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
      <LoadingBlock layoutClassName="col-span-1 sm:col-span-2 xl:col-span-1 h-[350px]" />);
  }
  
  const formatLabel = (selectedStat: string) => {
       return `${selectedStat.charAt(0)?.toUpperCase() ?? ''}${selectedStat.slice(1)?.toLowerCase() ?? ''}`;
  };
  
  return (
    <div className="col-span-1 sm:col-span-2 xl:col-span-1 h-[345px]">
      <div className="flex items-center w-full gap-4">
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
