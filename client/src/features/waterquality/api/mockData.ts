import { mockSiteData } from '@/features/sites/api/mockData';
import type { IMeasurementData } from '@/features/waterquality/api/interface';

export const generateMockMeasurements = (
  siteData: typeof mockSiteData,
  count: number = 10,
): IMeasurementData[] => {
  const measurements: IMeasurementData[] = [];
  const today = new Date();

  siteData.forEach(site => {
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i * 5);

      measurements.push({
        id: `measurement_${site.id}_${i + 1}`,
        siteName: site.siteName,
        location: site.location,
        date: date.toISOString(),
        pH: 6 + Math.random() * 3,
        suspendedSolids: Math.floor(100 + Math.random() * 150),
        totalCOD: Math.floor(200 + Math.random() * 300),
        fecalColiform: Math.floor(1000 + Math.random() * 2000),
        temperature: parseFloat((20 + Math.random() * 10).toFixed(2)),
        dissolvedOxygen: parseFloat((4 + Math.random() * 4).toFixed(2)),
        ammonia: parseFloat((1 + Math.random() * 2).toFixed(2)),
        nitrates: parseFloat((5 + Math.random() * 5).toFixed(2)),
        phosphates: parseFloat((0.5 + Math.random() * 1.5).toFixed(2)),
      });
    }
  });

  return measurements;
};
