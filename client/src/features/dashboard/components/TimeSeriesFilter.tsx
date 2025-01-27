import { Funnel, Drop, CalendarDot, CalendarDots } from "@phosphor-icons/react";
import { CustomSelect } from "@/components/ui";

interface TimeSeriesFilterProps{
    parameterOptions: string[];
}

const TimeSeriesFilter = ({parameterOptions}:TimeSeriesFilterProps) => {
  return (
        <section className="grid grid-cols-3">
            <div className="flex items-center w-fit gap-2">
                <Funnel weight="fill" size="20"/> 
                <CustomSelect
                    label="Parameter"
                    icon={Drop}
                    placeholder="Select a water quality parameter"
                    value="pH"
                    options={parameterOptions}
                    onChangeValue={()=>{}}
              />
            </div>
            <div className="flex items-center w-fit gap-2">
                <p className="text-xs">from</p>
                <CustomSelect
                    label="Date"
                    icon={CalendarDot}
                    placeholder="Select a water quality parameter"
                    value="2023-1-10"
                    options={["2023-1-10", "2023-1-14", "2023-2-2"]}
                    onChangeValue={()=>{}}
                />
            </div>
            <div className="flex items-center w-fit gap-2">
                <p className="text-xs">to</p>
                <CustomSelect
                    label="Parameter"
                    icon={CalendarDots}
                    placeholder="Select a water quality parameter"
                    value="2023-10-31"
                    options={["2023-1-10", "2023-1-14", "2023-2-2"]}
                    onChangeValue={()=>{}}
            />
            </div>
    </section>
  )
}

export default TimeSeriesFilter;
