import type { IThresholdData } from "@/features/thresholds/api/interface";

export const sampleThresholds: IThresholdData[] = [
    {
        id: "1",
        parameter: "pH",
        unit: "",
        value:"6"
    },
    {
        id: "2",
        parameter: "Total Suspended Solids",
        unit: "mg/L",
        value:"200"
    },
    {
        id: "3",
        parameter: "Total COD",
        unit: "mg/L",
        value:"150"
    },
    {
        id: "4",
        parameter: "Ammonia-Nitrogen",
        unit: "mg-N/L",
        value:"1"
    },
]