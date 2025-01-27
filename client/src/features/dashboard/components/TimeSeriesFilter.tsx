import { Funnel, Drop, CalendarDot, CalendarDots } from "@phosphor-icons/react";
import { CustomSelect } from "@/components/ui";
import type { IDateRange } from "@/features/dashboard/hooks/useTimeSeriesFilter";

interface TimeSeriesFilterProps{
    selectedParameter: string;
    selectedDateRange: IDateRange;
    parameterOptions: string[];
    dateOptions: string[];
    parameterListLoading: boolean;
    dateListLoading: boolean;
    handleSelectedParameter: (parameter: string) => void;
    handleSelectedDate: (key: keyof IDateRange, value?:string) => void;
}

const TimeSeriesFilter = ({
    selectedParameter,
    selectedDateRange,
    parameterOptions,
    dateOptions,
    parameterListLoading,
    dateListLoading,
    handleSelectedParameter,
    handleSelectedDate
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
                    value={selectedDateRange.startDate ?? dateOptions.at(-1) ?? null}
                    options={dateOptions}
                    onChangeValue={(value) => handleSelectedDate('startDate', value)}
                />
            </div>
            <div className="flex items-center  gap-2">
                <p className="text-xs">to</p>
                <CustomSelect
                    label={dateListLoading ? "Loading...":"Dates"}
                    icon={CalendarDots}
                    placeholder="Select a water quality parameter"
                    value={selectedDateRange.endDate ?? dateOptions[0] ?? null}
                    options={dateOptions}
                    onChangeValue={(value) => handleSelectedDate('endDate',value)}
            />
            </div>
    </section>
  )
}

export default TimeSeriesFilter;
