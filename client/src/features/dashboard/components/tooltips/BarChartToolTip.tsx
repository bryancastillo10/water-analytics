import type { TooltipProps } from "recharts";
import { useAppSelector } from "@/lib/redux/hooks";

const BarChartToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    const theme = useAppSelector((state) => state.theme.isDarkMode);
    
    if (active && payload && payload.length) {
        const data = payload[0]?.payload;
        return (
            <div className={`${theme ? "bg-dark border-darkGray" : "bg-light border-primary"} border shadow-md rounded-md px-4 py-3`}>
                <p
                    className={`font-semibold ${theme ? "text-secondary": "text-dark"}`}
                >
                    {data.parameter}
                </p>
                <p className={`${theme ? "text-light" : "text-primary"}`}>
                    <span className={`${theme ? "text-secondary": "text-dark"}`}>Avg: </span>
                    {`${data.avgValue.toFixed(2)}`}
                </p>
            </div>
        )
    }
    
    return null;
}


export default BarChartToolTip;
