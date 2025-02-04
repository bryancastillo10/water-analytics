import type { NutrientStatResult } from "@/features/dashboard/api/interface"
import GaugeChart from "@/features/dashboard/components/ui/GaugeChart";

import useGaugeConfig from "@/features/dashboard/hooks/useGaugeConfig";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";
import { getStatusStyle } from "@/features/dashboard/utils/getStatusStyle";
import { useAppSelector } from "@/lib/redux/hooks";

const GaugeCard = (props: NutrientStatResult<string,number>) => {
    const theme = useAppSelector((state) => state.theme.isDarkMode);
    const { nutrient, status } = props;
    const { cx, cy, innerRadius, outerRadius, dataToPercentage } = useGaugeConfig();
    const pieData = dataToPercentage(props);
    
    const statusStyle = getStatusStyle(status);
    const Icon = statusStyle.trendIcon;
    return (
        <div className={`grid grid-cols-5 h-[120px] rounded-xl border border-neutral shadow-md px-2
            ${theme ? "bg-darkGray text-light": "bg-white/80 text-primary"}
            `}>
            <div className="col-span-3">
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
            <div className="col-span-2">
                <h1 className="font-medium text-center p-4 text-lg">{formatLabel(nutrient)}</h1>
                
                <div className="flex items-center gap-2">
                    <Icon size="30" className={`${statusStyle.colorClass}`} />
                    <p className={`text-left font-bold leading-tight tracking-wider ${statusStyle.colorClass}`}>
                        {status.toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    )}

export default GaugeCard;
