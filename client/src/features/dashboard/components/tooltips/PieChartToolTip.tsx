import type { TooltipProps } from "recharts";
import { formatSourceType } from "@/features/dashboard/utils/formatSourceType";
import { useAppSelector } from "@/lib/redux/hooks";

interface ISitePercentage {
    sourceType: string;
    percentage: number;
    fill?: string;
}


const PieChartToolTip = ({ active, payload }: TooltipProps<number, string>) => { 
    const theme = useAppSelector((state) => state.theme.isDarkMode);

    if (active && payload && payload.length) {
        const data = payload[0]?.payload as ISitePercentage;
        return (
            <div className={`${theme ? "bg-dark border-darkGray":"bg-light border-primary"} border shadow-md rounded-md px-4 py-3`}>
                <p 
                className="font-semibold" 
                style={{color: data.fill}}>
                    {formatSourceType(data.sourceType)}
                </p>
                <p
                    className={`font-semibold ${theme ? "text-light" : "text-primary"}`}>
                    {`${data.percentage.toFixed(1)} %`}
                </p>
            </div>
        )
    };
    return null;
}

export default PieChartToolTip;
