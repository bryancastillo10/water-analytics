export const YAxisLabel = (label: string): string => {
    switch (label) {
        case "Basic Water Quality Parameter":
            return `pH, Temp (\u2103), DO (mg/L)`; 
        case "Organic Pollution Indicator":
            return `COD & Solids (mg/L), Coliform (MPN/100mL)`; 
        case "Nutrients Pollution Indicator":
            return "Concentration (mg/L)";
        default:
            return "Concentration (mg/L)";
    }
};
