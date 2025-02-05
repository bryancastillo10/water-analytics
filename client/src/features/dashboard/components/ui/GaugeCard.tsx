
import GaugeChart from "@/features/dashboard/components/ui/GaugeChart";

import useGaugeConfig from "@/features/dashboard/hooks/useGaugeConfig";
import { getStatusStyle } from "@/features/dashboard/utils/getStatusStyle";
import { useAppSelector } from "@/lib/redux/hooks";
import type { IParamStatisticsResponse } from "@/features/dashboard/api/interface";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";

import { LoadingBlock } from "@/components/common";

interface GaugeCardProps extends IParamStatisticsResponse<string,number> {
    loading: boolean;
}

const GaugeCard = (props: GaugeCardProps) => {
    const theme = useAppSelector((state) => state.theme.isDarkMode);
    const { parameter, status, loading } = props;
    const { cx, cy, innerRadius, outerRadius, dataToPercentage } = useGaugeConfig();
    const pieData = dataToPercentage(props);
    
    const statusStyle = getStatusStyle(status);
    const Icon = statusStyle.trendIcon;
    
    if (loading) {
        return (
            <LoadingBlock layoutClassName="h-full rounded-xl border border-neutral"/>
        )
    }
    return (
        <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-auto max-h-[120px] rounded-xl border border-neutral shadow-md px-2 py-1 w-full
        ${theme ? "bg-darkGray text-light" : "bg-white/80 text-primary"}`}>
        
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3 w-full place-items-center">
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

        <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-2 flex flex-col text-left w-full">
            <h1 className="font-medium px-2 py-2 text-base sm:text-lg">{formatLabel(parameter)}</h1>

           <div className="flex items-center sm:justify-between w-full px-4 gap-2">
                <Icon size="30" className={`min-w-[40px] ${statusStyle.colorClass}`} />
                <p className={`font-bold leading-tight tracking-wider sm:text-left
                    text-sm ${statusStyle.colorClass}`}>
                    {status.toUpperCase()}
                </p>
            </div>
        </div>
    </div>
    )}

export default GaugeCard;
