import { useGetAllMeasurementsQuery } from "@/features/waterquality/api/measurementApi";
import { useGetSiteByUserQuery } from "@/features/sites/api/sitesApi";
import type { IMeasurementData } from "@/features/waterquality/api/interface";


type PreProcessedWQData = Record<
  string,
  {
    location: string | undefined;
    siteId: string | undefined;
    data: IMeasurementData[]
  }
  >;

const useGetMeasurementData = () => {
    const { data: siteData } = useGetSiteByUserQuery();
    const { data: measurementData } = useGetAllMeasurementsQuery();

    // Query of Measurement Data Per Site
    const measurementDataWithSiteInfo = measurementData?.map((measure) => {
        const site = siteData?.find((site) => site.id === measure.siteId);
        return {
            ...measure,
            siteName: site?.siteName ?? "Site Not Found",
            siteId: site?.id ?? "Site ID Not Found",
            location: site?.location ?? "Location Not Found"
        }
    }) ?? [];

    // Pre-processing of data to match rendering
    const groupMeasurementsBySite = (
        measurements: IMeasurementData[]
      ): PreProcessedWQData => {
        return measurements.reduce((acc, measurement) => {
          const { siteName, siteId, location } = measurement;
          if (siteName) { 
            if (!acc[siteName]) {
              acc[siteName] = { location, siteId, data: [] };
            }
            acc[siteName].data.push(measurement);
          }
          return acc;
        }, {} as PreProcessedWQData);
    };
    
    const dataSummary = Object.entries(groupMeasurementsBySite(measurementDataWithSiteInfo));
    

    return {
        dataSummary
    }
}

export default useGetMeasurementData;
