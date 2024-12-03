import { useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

import type { IThresholdData } from "@/features/thresholds/api/interface";
import { updateThresholdColumnsConfig } from "@/features/thresholds/lib/updateThresholdTableConfig";

const useUpdateThreshold = ({thresholdData}:{thresholdData: IThresholdData[]}) => {
    const preprocessData = (data: typeof thresholdData) => {
        return data.reduce((acc, item) => {
          acc[item.id] = item.value;
          return acc;
        }, {} as Record<string, number>);
      };
      
    const [paramsValue, setParamsValue] = useState(() => preprocessData(thresholdData));
      
    const onChangeValue = (id: string, value: number) => {
        setParamsValue({ ...paramsValue, [id]: value });
      };
    
    
    const updateThresholdColumns = updateThresholdColumnsConfig(paramsValue, onChangeValue);
    
    const updateTable = useReactTable({
        data: thresholdData,
        columns: updateThresholdColumns,
        getCoreRowModel: getCoreRowModel()
    });

    return {
        updateTable,

    }
}

export default useUpdateThreshold
