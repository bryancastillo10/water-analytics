import GaugeChart from '@/features/dashboard/components/ui/GaugeChart';

import useGaugeConfig from '@/features/dashboard/hooks/useGaugeConfig';
import { getStatusStyle } from '@/features/dashboard/utils/getStatusStyle';
import { useAppSelector } from '@/lib/redux/hooks';
import type { IParamStatisticsResponse } from '@/features/dashboard/api/interface';
import { formatLabel } from '@/features/dashboard/utils/formatLabel';

import { LoadingBlock } from '@/components/common';

interface GaugeCardProps extends IParamStatisticsResponse<string, number> {
  loading: boolean;
  paramGroup: string;
}

const GaugeCard = (props: GaugeCardProps) => {
  const theme = useAppSelector(state => state.theme.isDarkMode);
  const { parameter, status, loading, paramGroup } = props;
  const { cx, cy, innerRadius, outerRadius, dataToPercentage } = useGaugeConfig();
  const pieData = dataToPercentage(props);

  const statusStyle = getStatusStyle(status);
  const Icon = statusStyle.trendIcon;

  if (loading) {
    return <LoadingBlock layoutClassName="h-full rounded-xl border border-neutral" />;
  }
  return (
    <>
      <div
        className={`flex flex-col md:flex-row w-fit h-fit rounded-xl border border-neutral shadow-md px-2 py-3  
            ${theme ? 'bg-darkGray text-light' : 'bg-white/80 text-primary'}`}
      >
        <div className="w-[250px] h-[120px] mx-auto lg:mx-0  place-items-center">
          <GaugeChart
            cx={cx}
            cy={cy}
            innerRad={innerRadius}
            outerRad={outerRadius}
            percentage={pieData.percentage}
            radian={Math.PI / 180}
            theme={theme}
          />
        </div>

        <div className="w-[150px] h-[120px] mx-auto lg:mx-0 flex flex-col text-left">
          <h1 className="font-medium px-2 py-2 text-base sm:text-lg">{formatLabel(parameter)}</h1>
          <div className="flex items-center justify-start w-full px-4 gap-2">
            <Icon size="30" className={`min-w-[40px] ${statusStyle.colorClass}`} />
            <p
              className={`font-bold leading-tight tracking-wider sm:text-left
                            text-sm ${statusStyle.colorClass}`}
            >
              {status.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      {paramGroup === 'basic' && (
        <p className={`-mt-20 italic ${theme ? 'text-neutral' : 'text-darkGray'}`}>
          **pH & Temperature is not applicable for pollution loading
        </p>
      )}
    </>
  );
};

export default GaugeCard;
