import TextHeader from "@/components/common/TextHeader";
import { Plus, MapPin } from "@phosphor-icons/react";
import useDrawer from "@/hooks/useDrawer";

import WaterQualityTable from "@/features/waterquality/components/WaterQualityTable";
import useGetMeasurementData from "@/features/waterquality/hooks/useGetMeasurementData";
import { MainPageLoadingState } from "@/components/layout";

const DataTablePage = () => {
  const { handleOpenDrawer } = useDrawer();
  const { dataSummary, isLoading } = useGetMeasurementData();

  const addMeasurementDrawer = (siteName:string, siteId:string) => {
    handleOpenDrawer("Add Water Quality Data to " + siteName , "AddMeasurementData", { siteId });
  }

  return (
    <main className="flex flex-col w-full">
      {isLoading ? <div className="flex justify-center items-center w-full h-[80vh]">
          <MainPageLoadingState />
        </div> :
        dataSummary.map(([siteName, {location, siteId, data}]) => (
        <div key={siteName} className="mb-8">
          <div className="flex justify-between items-center gap-x-4">
            <div className="flex flex-col">
              <TextHeader text={siteName} />
              <p className="flex items-center gap-2 text-sm"><MapPin />{location}</p>
            </div>
            <div
              onClick={()=> addMeasurementDrawer(siteName, siteId!)}
              className="rounded-full cursor-pointer p-2 duration-300 ease-in-out hover:scale-110 hover:bg-neutral/40 border border-primary border-dashed">
              <Plus
                className="font-bold text-secondary"
                size="20"
              />
            </div>
          </div>
          <div className="mt-4">
            <WaterQualityTable data={data} />
          </div>
        </div>
      ))}
    </main>
  )
}

export default DataTablePage;
