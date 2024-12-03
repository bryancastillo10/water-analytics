import React, { useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

import type { IThresholdData } from "@/features/thresholds/api/interface";
import { updateThresholdColumnsConfig } from "@/features/thresholds/lib/updateThresholdTableConfig";


const useUpdateThreshold = ({thresholdData}:{thresholdData: IThresholdData[]}) => {
    const preprocessData = (data: typeof thresholdData) => {
        return data.reduce((acc, item) => {
          acc[item.parameter] = item.value.toString();
          return acc;
        }, {} as Record<string,string>);
      };
      
    const [paramsValue, setParamsValue] = useState(() => preprocessData(thresholdData));

    const onChangeValue = (parameter: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setParamsValue((prev) => ({
        ...prev, 
        [parameter]: value
      }));
    };
    
  console.log(paramsValue);
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
