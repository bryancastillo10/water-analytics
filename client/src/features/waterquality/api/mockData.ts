export interface Measurement {
  id: string;
  timestamp: string | undefined;
  phLevel: number | null;
  suspendedSolids: number | null;
  totalCOD: number | null;
  fecalColiform: number | null;
  temperature: number | null;
  dissolvedOxygen: number | null;
  ammonia: number | null;
  nitrates: number | null;
  phosphates: number | null;
  siteId: string;
  actions?: {
    update?: () => void;
    delete?: () => void;
  }
}

export const generateMockData = (count: number = 24): Measurement[] => {
  const mockData: Measurement[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (count - 1 - i) * 5); 

    mockData.push({
      id: `mock${i + 1}`,
      timestamp: date.toISOString().split("T")[0], 
      phLevel: 6 + Math.random() * 3,
      suspendedSolids: 100 + Math.random() * 150,
      totalCOD: 200 + Math.random() * 300,
      fecalColiform: 1000 + Math.random() * 2000,
      temperature: 20 + Math.random() * 10,
      dissolvedOxygen: 4 + Math.random() * 4,
      ammonia: 1 + Math.random() * 2,
      nitrates: 5 + Math.random() * 5,
      phosphates: 0.5 + Math.random() * 1.5,
      siteId: `Area ${Math.floor(Math.random() * 3) + 1}`,
    });
  }

  return mockData;
};
