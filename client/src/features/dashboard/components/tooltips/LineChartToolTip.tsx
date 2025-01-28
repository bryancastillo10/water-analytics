import type { TooltipProps } from "recharts";
import { useAppSelector } from "@/lib/redux/hooks";

interface LineChartToolTipProps extends TooltipProps<number, string> {
    selectedParameter: string;
}

const LineChartToolTip = ({
    active,
    payload,
    label,
    selectedParameter
    }: LineChartToolTipProps) => {
    const theme = useAppSelector((state) => state.theme.isDarkMode);

    if (active && payload && payload.length) {
        const data = payload[0]?.value 
        return (
            <div className={`${theme ? "bg-darkGray border-darkGray":"bg-light border-primary"} border shadow-md rounded-md px-4 py-3`}>
                <p className="text-sm">{`Date: ${label}`}</p>
                <div className="flex items-center gap-2">
                    <h1 className="font-semibold">{selectedParameter}</h1>
                    <p className={`${theme ? "text-secondary" : "text-primary"}`}>
                        {data}
                    </p>
                </div>
            </div>
        )
    }
    return null;
}

export default LineChartToolTip;
