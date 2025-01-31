import { useState, useMemo, useCallback, useRef } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useToast } from "@/hooks/useToast";

import type { IThresholdData, UpdateThresholdRequest } from "@/features/thresholds/api/interface";
import { useUpdateThresholdMutation } from "@/features/thresholds/api/thresholdApi";
import { updateThresholdColumnsConfig } from "@/features/thresholds/lib/updateThresholdTableConfig";

const useUpdateThreshold = ({ thresholdData }: { thresholdData: IThresholdData[] }) => {
  const initialParamsValue = useMemo(
    () =>
      thresholdData.reduce(
        (acc, item) => {
          acc[item.parameter] = item.value.toString();
          return acc;
        },
        {} as Record<string, string>
      ),
    [thresholdData]
  );

  const [paramsValue, setParamsValue] = useState<Record<string, string>>(initialParamsValue);
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
      const value = paramsValue[threshold.parameter] ?? "";
      return {
        thresholdId: threshold.id,
        value: value.trim() === "" ? 0 : parseFloat(value),
      };
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
