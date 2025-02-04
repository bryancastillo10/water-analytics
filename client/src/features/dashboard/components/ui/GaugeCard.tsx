import type { NutrientStatResult } from "@/features/dashboard/api/interface"
import GaugeChart from "@/features/dashboard/components/ui/GaugeChart";

import useGaugeConfig from "@/features/dashboard/hooks/useGaugeConfig";
import { formatLabel } from "@/features/dashboard/utils/formatLabel";
import { getStatusStyle } from "@/features/dashboard/utils/getStatusStyle";


const GaugeCard = (props: NutrientStatResult<string,number>) => {
    const { nutrient, status } = props;
    const { dataToPercentage } = useGaugeConfig();
    const pieData = dataToPercentage(props);
    
    const statusStyle = getStatusStyle(status);
    const Icon = statusStyle.trendIcon;
    return (
        <div className="grid grid-cols-5 h-[120px] rounded-xl border 
        border-neutral shadow-md px-2">
            <div className="col-span-3">
                <GaugeChart
                    name={pieData.name}
                    percentage={pieData.percentage}
                    status={pieData.status}
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
