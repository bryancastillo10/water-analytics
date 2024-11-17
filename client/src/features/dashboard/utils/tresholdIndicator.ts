import { ChartLineUp, ChartLineDown } from "@phosphor-icons/react";

const THRESHOLDS = {
  "pH Level": {
    min: 6.5,
    max: 8.5,
    checkValue: (value: number) => value >= 6.5 && value <= 8.5
  },
  "Avg Suspended Solids": {
    max: 30, 
    checkValue: (value: number) => value <= 30
  },
  "Avg Total COD": {
    max: 100, 
    checkValue: (value: number) => value <= 100
  },
  "Fecal Coliform": {
    max: 200, 
    checkValue: (value: number) => value <= 200
  }
};

export const getTrendInfo = (parameter: string, value: number) => {
  const threshold = THRESHOLDS[parameter as keyof typeof THRESHOLDS];
  
  if (!threshold) {
    return {
      isGood: true,
      message: "No threshold set",
      icon: ChartLineUp,
      colorClass: "text-emerald-300"
    };
  }

  const isWithinThreshold = threshold.checkValue(value);

  return {
    isGood: isWithinThreshold,
    message: isWithinThreshold ? "Pass" : "Above Treshold",
    icon: isWithinThreshold ? ChartLineDown : ChartLineUp,
    colorClass: isWithinThreshold ? "text-emerald-300" : "text-rose-300"
  };
};