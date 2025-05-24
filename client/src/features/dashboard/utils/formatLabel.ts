const chartLabel: Record<string, string> = {
  pH: 'pH',
  'Suspended Solids': 'suspendedSolids',
  COD: 'totalCOD',
  Coliform: 'fecalColiform',
  Temperature: 'temperature',
  'Dissolved Oxygen': 'dissolvedOxygen',
  'Ammonia-N': 'ammonia',
  'Nitrates-N': 'nitrates',
  'Phosphates-P': 'phosphates',
};

export const formatLabel = (value: string): string => {
  const key = Object.keys(chartLabel).find(key => chartLabel[key] === value);

  return key ?? value;
};
