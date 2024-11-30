import TextHeader from "@/components/common/TextHeader";

import { useAppSelector } from "@/lib/redux/hooks"
import useDrawer from "@/hook/useDrawer";
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react"

import { sampleThresholds } from "@/features/thresholds/api/mockData"
import type { IThresholdData } from "@/features/thresholds/api/interface";

const ThresholdSettings = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const isAdmin = true;
  const { handleOpenDrawer } = useDrawer();

  const updateThreshold = () => {
    handleOpenDrawer("Edit your threshold values", "UpdateThresholdForm", {thresholdData: sampleThresholds});
  }

  const colHeaders = ["Parameter", "Unit", "Min Value", "Max Value"];
  const getThresholdValues = (index: number, threshold:IThresholdData ) =>{
    switch (index) {
      case 0:
        return threshold.parameter;
      case 1:
        return threshold.unit;
      case 2:
        return threshold.minValue;
      case 3:
        return threshold.maxValue;
      default:
        return threshold.parameter;
      }
  }

  return (
    <section className="px-6 py-4">
          <TextHeader text="Threshold Settings" />
          <div className="w-fit relative border mt-4 border-neutral rounded-t-xl">
          {/* Table Header */}
            <div className={`hidden md:grid grid-cols-4  gap-4 rounded-t-xl text-center font-semibold tracking-wider
              ${theme ? "bg-darkGray text-secondary":"bg-primary text-light"}
              `}>
                {colHeaders.map((col) => <p key={col}  className="px-1 py-2">{col}</p>)}
            </div>
            {/* Edit Threshold Icon */}   
        <div className="border border-dashed border-darkGray p-2 rounded-xl absolute z-20 -top-8 -right-9
             xl:right-2  xl:-top-12">
              <p onClick={updateThreshold} className="flex items-center gap-x-2 cursor-pointer hover:scale-110">
                <PencilSimpleLine size="20"/> <span className="hidden xl:block">Edit</span>
              </p>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-neutral">
            {sampleThresholds.map((threshold) => (
              <div 
                key={threshold.id}
                className="relative group grid grid-cols-1 min-w-fit md:w-full text-left duration-300 ease-in-out
                hover:bg-darkGray/80 hover:rounded-t-xl hover:text-light
                md:grid-cols-4 md:text-center md:gap-4 py-2" 
              >
                {/* Mobile View */}
                <div className="flex flex-col md:hidden">
                  {colHeaders.map((col,index) => (
                    <div key={index} className="flex justify-between px-3">
                      <p className="font-semibold">{col}</p>
                      <p className="">{getThresholdValues(index,threshold)}</p>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                {colHeaders.map((_, index) => (
                  <p
                    key={index}
                    className="hidden md:block py-2 px-1">{getThresholdValues(index, threshold)}</p>
                ))}
    
      
                {/* Delete Icon for Admin Only */}
                {isAdmin &&  (<div className="absolute z-10 bg-neutral/90 p-2 rounded-md top-2 right-2 md:-right-10 flex gap-4 opacity-0 group-hover:opacity-100 duration-300">
                  <TrashSimple 
                          size="18" 
                          weight="fill"
                          className="text-dark cursor-pointer hover:scale-110 transition-transform" 
                  />
                </div>)}
              </div>
            ))}
          </div>
        </div>
    </section>
        )
      }
export default ThresholdSettings;
