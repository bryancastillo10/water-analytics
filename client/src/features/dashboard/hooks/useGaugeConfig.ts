import type { IParamStatisticsResponse } from '@/features/dashboard/api/interface';

const useGaugeConfig = () => {
  const dataToPercentage = (data: IParamStatisticsResponse<string, number>) => {
    const calcPercentage = Math.min((data.avgValue / data.thresholdValue) * 100, 100).toFixed(2);
    return {
      name: data.parameter,
      percentage: calcPercentage,
      status: data.status,
    };
  };

  const cx = 100;
  const cy = 100;
  const innerRadius = 60;
  const outerRadius = 90;

  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    dataToPercentage,
  };
};

export default useGaugeConfig;
