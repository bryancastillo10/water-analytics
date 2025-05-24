import { useGetAllMeasurementsQuery } from '@/features/waterquality/api/measurementApi';
import { useGetSiteByUserQuery } from '@/features/sites/api/sitesApi';
import type { IMeasurementData } from '@/features/waterquality/api/interface';

type PreProcessedWQData = Record<
  string,
  {
    location: string | undefined;
    siteId: string | undefined;
    data: IMeasurementData[];
  }
>;

const useGetMeasurementData = () => {
  const { data: siteData } = useGetSiteByUserQuery();
  const { data: measurementData, isLoading } = useGetAllMeasurementsQuery();

  const measurementDataWithSiteInfo =
    measurementData?.map(measure => {
      const site = siteData?.find(site => site.id === measure.siteId);
      return {
        ...measure,
        siteName: site?.siteName ?? 'Site Not Found',
        siteId: site?.id ?? 'Site ID Not Found',
        location: site?.location ?? 'Location Not Found',
      };
    }) ?? [];

  const groupMeasurementsBySite = (measurements: IMeasurementData[]): PreProcessedWQData => {
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

  let dataSummary = groupMeasurementsBySite(measurementDataWithSiteInfo);
  siteData?.forEach(site => {
    if (!dataSummary[site.siteName]) {
      dataSummary[site.siteName] = { location: site.location, siteId: site.id, data: [] };
    }
  });

  return {
    dataSummary: Object.entries(dataSummary),
    isLoading,
  };
};

export default useGetMeasurementData;
