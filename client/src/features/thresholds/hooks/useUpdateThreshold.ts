import React, { useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useToast } from "@/hook/useToast";

import type { IThresholdData, UpdateThresholdRequest } from "@/features/thresholds/api/interface";
import { useUpdateThresholdMutation } from "@/features/thresholds/api/thresholdApi";
import { updateThresholdColumnsConfig } from "@/features/thresholds/lib/updateThresholdTableConfig";


const useUpdateThreshold = ({thresholdData}:{thresholdData: IThresholdData[]}) => {
    const preprocessData = (data: typeof thresholdData) => {
        return data.reduce((acc, item) => {
          acc[item.parameter] = item.value.toString();
          return acc;
        }, {} as Record<string,string>);
      };
      
    const [paramsValue, setParamsValue] = useState(() => preprocessData(thresholdData));
    const [updateThreshold, {isLoading} ] = useUpdateThresholdMutation();
    const { showToast } = useToast();

    const onChangeValue = (parameter: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setParamsValue((prev) => ({
        ...prev, 
        [parameter]: value
      }));
    };
  
    const preparePayload = (): UpdateThresholdRequest[] => {
      return thresholdData.map((threshold) => {
        const valueString = paramsValue[threshold.parameter]; 
        const value = valueString !== undefined ? parseFloat(valueString) : 0; 
        return {
          thresholdId: threshold.id,
          value,
        };
      });
    };
    
    const data = preparePayload();
    const callUpdateThreshold = async (data: UpdateThresholdRequest[]) => {
        try{
          const res = await updateThreshold(data).unwrap();
          showToast({
            status: "success",
            message: res.message
          });
      }
      catch (error: any){
          showToast({
            status: "error",
            message: error.message || "Failed to update the threshold"
          });
      }
    };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callUpdateThreshold(data);
  };

    const updateThresholdColumns = updateThresholdColumnsConfig(paramsValue, onChangeValue);
    
    
    const updateTable = useReactTable({
        data: thresholdData,
        columns: updateThresholdColumns,
        getCoreRowModel: getCoreRowModel()
    });

    return {
      updateTable,
      isLoading,
      handleSubmit
    }
}

export default useUpdateThreshold;
