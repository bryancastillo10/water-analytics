interface IParamDisplayInfo {
  displayName: string;
  unit: string;
}

export const parameterRecord: Record<string, string> = {
  pH: 'pH',
  dissolvedOxygen: 'Dissolved Oxygen',
  temperature: 'Temperature',
  suspendedSolids: 'Total Suspended Solids',
  totalCOD: 'Total COD',
  fecalColiform: 'Fecal Coliform',
  ammonia: 'Ammonia as N',
  nitrates: 'Nitrates as N',
  phosphates: 'Phosphates as P',
};

export const parameterCardDisplayNames: Record<string, IParamDisplayInfo> = {
  pH: {
    displayName: 'pH Level',
    unit: '',
  },
  suspendedSolids: {
    displayName: 'Avg Suspended Solids',
    unit: 'mg/L',
  },
  totalCOD: {
    displayName: 'Avg Total COD',
    unit: 'mg/L',
  },
  fecalColiform: {
    displayName: 'Fecal Coliform',
    unit: 'MPN/100 mL',
  },
};
