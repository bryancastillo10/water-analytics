import TextHeader from "@/components/common/TextHeader"
import { sampleThresholds } from "@/features/user/api/mockData"
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react"


const ThresholdSettings = () => {
  return (
    <section className="px-6 py-4">
          <TextHeader text="Threshold Settings" />
          <div className="w-fit border mt-4 border-neutral rounded-t-xl">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-4 gap-4 bg-neutral rounded-t-xl text-center font-semibold tracking-wider">
            <p className="px-1 py-2">Parameter</p>
            <p className="px-1 py-2">Unit</p>
            <p className="px-1 py-2">Min Value</p>
            <p className="px-1 py-2">Max Value</p>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-neutral">
            {sampleThresholds.map((threshold) => (
              <div 
                className="relative group grid grid-cols-1 w-[360px] md:w-full text-left duration-300 ease-in-out
                hover:bg-primary hover:rounded-xl hover:text-light
                md:grid-cols-4 md:text-center md:gap-4 py-2" 
                key={threshold.id}
              >
                {/* Mobile View */}
                <div className="flex flex-col md:hidden">
                  <div className="flex justify-between px-3">
                    <p className="font-semibold">Parameter:</p>
                    <p>{threshold.parameter}</p>
                  </div>
                  <div className="flex justify-between px-3">
                    <p className="font-semibold">Unit:</p>
                    <p>{threshold.unit}</p>
                  </div>
                  <div className="flex justify-between px-3">
                    <p className="font-semibold">Min Value:</p>
                    <p>{threshold.minValue}</p>
                  </div>
                  <div className="flex justify-between px-3">
                    <p className="font-semibold">Max Value:</p>
                    <p>{threshold.maxValue}</p>
                  </div>
                </div>

                {/* Desktop View */}
                <p className="hidden md:block py-2 px-1">{threshold.parameter}</p>
                <p className="hidden md:block py-2 px-1">{threshold.unit}</p>
                <p className="hidden md:block py-2 px-1">{threshold.minValue}</p>
                <p className="hidden md:block py-2 px-1">{threshold.maxValue}</p>

                {/* Action Icons */}
                <div className="absolute z-10 bg-neutral/90 p-2 rounded-md top-2 right-2 md:top-2 md:right-2 flex gap-4 opacity-0 group-hover:opacity-100 duration-300">
                  <PencilSimpleLine 
                          size="18" 
                          className="text-dark cursor-pointer hover:scale-110 transition-transform" 
                  />
                  <TrashSimple 
                          size="18" 
                          className="text-dark cursor-pointer hover:scale-110 transition-transform" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
        )
      }
export default ThresholdSettings;
