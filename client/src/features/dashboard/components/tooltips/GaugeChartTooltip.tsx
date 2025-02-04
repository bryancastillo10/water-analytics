import type { TooltipProps } from "recharts";
import { useAppSelector } from "@/lib/redux/hooks";

const GaugeChartToolTip = ({ active, payload }: TooltipProps<number, string>) => { 
    const theme = useAppSelector((state) => state.theme.isDarkMode);

    if (active && payload && payload.length) {
        const data = payload.find((param) => param.payload.name === "Loading");
        if (!data) return null;
        
        return (
            <div className={`border shadow-md rounded-md px-4 py-3 
                ${theme ? "bg-dark border-darkGray text-light" : "bg-light border-primary text-primary"}`}>
                <p className={`font-medium ${theme ? "text-secondary": "text-dark"}`}>
                    {data.name} 
                </p>
                <p className="font-bold">
                    {`${data?.value?.toFixed(1)}%` || "No Data"}
                </p>
            </div>
        );
    };
    return null;
}

export default GaugeChartToolTip;
