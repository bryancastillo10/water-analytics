import { useState, useMemo, useCallback, useRef } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useToast } from "@/hooks/useToast";

import type { IThresholdData, UpdateThresholdRequest } from "@/features/thresholds/api/interface";
import { useUpdateThresholdMutation } from "@/features/thresholds/api/thresholdApi";
import { updateThresholdColumnsConfig } from "@/features/thresholds/lib/updateThresholdTableConfig";


type ReducedThresholdDataType = Record<string, string | { minValue: string; maxValue: string }>;

const useUpdateThreshold = (thresholdData: IThresholdData[]) => {
  const initialParamsValue = useMemo(
    () =>
      thresholdData.reduce((acc, item) => {
        if (item.parameter === 'pH' && item.minValue && item.maxValue) {
          acc[item.parameter] = {
            minValue: item.minValue.toString(),
            maxValue: item.maxValue.toString(),
          };
        } else {
          acc[item.parameter] = item.value.toString();
        }
        return acc;
      }, {} as ReducedThresholdDataType)
  ,
  [thresholdData]
);


  const [paramsValue, setParamsValue] = useState<ReducedThresholdDataType>(initialParamsValue);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({}); 
  const [updateThreshold, { isLoading }] = useUpdateThresholdMutation();
  const { showToast } = useToast();

  const onChangeValue = useCallback((parameter: string, value: string) => {
    setParamsValue((prev) => {
      if (prev[parameter] === value) return prev; 
      return { ...prev, [parameter]: value };
    });

    requestAnimationFrame(() => {
      inputRefs.current[parameter]?.focus();
    });
  }, []);

const preparePayload = useCallback((): UpdateThresholdRequest[] => {
  return thresholdData.map((threshold) => {
    if (threshold.parameter === "pH") {
      const phValue = paramsValue[threshold.parameter] as {
        minValue: string;
        maxValue: string;
      };

      return {
        thresholdId: threshold.id,
        value: null,
        minValue: phValue.minValue.trim() === "" ? 0 : parseFloat(phValue.minValue),
        maxValue: phValue.maxValue.trim() === "" ? 0 : parseFloat(phValue.maxValue),
      };
    } else {
      const value = (paramsValue[threshold.parameter] ?? "").toString();
      return {
        thresholdId: threshold.id,
        value: value.trim() === "" ? 0 : parseFloat(value),
      };
    }
  });
}, [paramsValue, thresholdData]);


  const callUpdateThreshold = async (payloadData: UpdateThresholdRequest[]) => {
    try {
      const res = await updateThreshold(payloadData).unwrap();
      showToast({ status: "success", message: res.message });
    } catch (error: any) {
      showToast({ status: "error", message: error.message || "Failed to update the threshold" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callUpdateThreshold(preparePayload());
  };

  const updateThresholdColumns = useMemo(() => {
    return updateThresholdColumnsConfig(paramsValue, onChangeValue, inputRefs);
  }, [paramsValue, onChangeValue]);

  const updateTable = useReactTable({
    data: thresholdData,
    columns: updateThresholdColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { updateTable, isLoading, handleSubmit };
};

export default useUpdateThreshold;
