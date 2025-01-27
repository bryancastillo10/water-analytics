import { Funnel, Drop, CalendarDot, CalendarDots } from "@phosphor-icons/react";
import { CustomSelect } from "@/components/ui";

interface TimeSeriesFilterProps{
    selectedParameter: string;
    parameterOptions: string[];
    dateOptions: string[];
    parameterListLoading: boolean;
    dateListLoading: boolean;
    handleSelectedParameter: (parameter: string) => void;
}

const TimeSeriesFilter = ({
    selectedParameter,
    parameterOptions,
    dateOptions,
    parameterListLoading,
    dateListLoading,
    handleSelectedParameter
}: TimeSeriesFilterProps) => {
  return (
        <section className="flex flex-col xl:flex-row gap-4">
            <div className="flex items-center gap-2">
                <Funnel weight="fill" size="20"/> 
                <CustomSelect
                    label={parameterListLoading ? "Loading..." : "Parameters"}
                    width="w-[250px]"
                    icon={Drop}
                    placeholder="Select a water quality parameter"
                    value={selectedParameter}
                    options={parameterOptions}
                    onChangeValue={handleSelectedParameter}
                />
            </div>
            <div className="flex items-center  gap-2">
                <p className="text-xs">from</p>
                <CustomSelect
                    label={dateListLoading ? "Loading...":"Dates"}
                    icon={CalendarDot}
                    placeholder="Select a water quality parameter"
                    value="2023-1-10"
                    options={dateOptions}
                    onChangeValue={()=>{}}
                />
            </div>
            <div className="flex items-center  gap-2">
                <p className="text-xs">to</p>
                <CustomSelect
                    label={dateListLoading ? "Loading...":"Dates"}
                    icon={CalendarDots}
                    placeholder="Select a water quality parameter"
                    value="2023-10-31"
                    options={dateOptions}
                    onChangeValue={()=>{}}
            />
            </div>
    </section>
  )
}

export default TimeSeriesFilter;
