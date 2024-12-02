import TextHeader from "@/components/common/TextHeader";
import { Plus, MapPin } from "@phosphor-icons/react";

import useDrawer from "@/hook/useDrawer";

import { generateMockMeasurements } from "@/features/waterquality/api/mockData";
import { mockSiteData } from "@/features/sites/api/mockData";
import WaterQualityTable from "@/features/waterquality/components/WaterQualityTable";

const DataTablePage = () => {
  const { handleOpenDrawer } = useDrawer();

  const mockMeasurements = generateMockMeasurements(mockSiteData, 5);

  const groupedMeasurements = mockMeasurements.reduce((acc, measurement) => {
    const { siteName, location } = measurement;
    if (!acc[siteName]) {
      acc[siteName] = { location, data: [] };
    }

    acc[siteName].data.push(measurement);

    return acc;
  }, {} as Record<string, { location: string, data: typeof mockMeasurements }>);


  const addMeasurementDrawer = (siteName:string) => {
    handleOpenDrawer("Add Water Quality Data to " + siteName , "AddMeasurementData");
  }

  return (
    <main className="flex flex-col w-full">
      {Object.entries(groupedMeasurements).map(([siteName, {location,data}]) => (
        <div key={siteName} className="mb-8">
          <div className="flex justify-between items-center gap-x-4">
            <div className="flex flex-col">
              <TextHeader text={siteName} />
              <p className="flex ixtems-center gap-2 text-sm"><MapPin />{location}</p>
            </div>
            <div
              onClick={()=> addMeasurementDrawer(siteName)}
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
