import { useGetAllMeasurementsQuery } from "@/features/waterquality/api/measurementApi";
import { useGetSiteByUserQuery } from "@/features/sites/api/sitesApi";
import type { IMeasurementData } from "@/features/waterquality/api/interface";

const useGetMeasurementData = () => {
    const { data: siteData } = useGetSiteByUserQuery();
    const { data: measurementData } = useGetAllMeasurementsQuery();

    // Query of Measurement Data Per Site
    const measurementDataWithSiteInfo = measurementData?.map((measure) => {
        const site = siteData?.find((site) => site.id === measure.siteId);
        return {
            ...measure,
            siteName: site?.siteName ?? "Site Not Found",
            location: site?.location ?? "Location Not Found"
        }
    }) ?? [];

    // Pre-processing of data to match rendering
    const groupMeasurementsBySite = (
      measurements: IMeasurementData[]
    ): Record<string, { location: string | undefined; data: IMeasurementData[] }> => {
      return measurements.reduce((acc, measurement) => {
        const { siteName, location } = measurement;
    
        if (!siteName) {
          console.warn("Measurement missing siteName:", measurement);
          return acc; 
        }
    
        if (!acc[siteName]) {
          acc[siteName] = { location: location ?? undefined, data: [] }; 
        }
    
        acc[siteName].data.push(measurement);
        return acc;
      }, {} as Record<string, { location: string | undefined; data: IMeasurementData[] }>);
    };
    
    const dataSummary = Object.entries(groupMeasurementsBySite(measurementDataWithSiteInfo));
    

    return {
        dataSummary
    }
}

export default useGetMeasurementData;
