import { useState, useMemo, type ChangeEvent, type FormEvent } from "react";
import { useToast } from "@/hooks/useToast";
import { useUpdateMeasurementMutation } from "@/features/waterquality/api/measurementApi";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";

const useUpdateWQData = (findMeasurement: IMeasurementData) => {
  const { showToast } = useToast();
  const [updateMeasurement, { isLoading}] = useUpdateMeasurementMutation();

  // const formatDate = (date: Date | null): string => date?.toISOString().split("T")[0] || "";

  // Data pre-processing
  const basicParamsToUpdate = useMemo(() => {
    return {
      id: findMeasurement.id,
      pH: findMeasurement.pH ?? null,
      temperature: findMeasurement.temperature ?? null,
      dissolvedOxygen: findMeasurement.dissolvedOxygen ?? null,
    };
  }, [findMeasurement]);

  const orgIndParamsToUpdate = useMemo(() => {
    return {
      id: findMeasurement.id,
      totalCOD: findMeasurement.totalCOD ?? null,
      suspendedSolids: findMeasurement.suspendedSolids ?? null,
      fecalColiform: findMeasurement.fecalColiform ?? null,
    };
  }, [findMeasurement]);

  const nutrientParamsToUpdate = useMemo(() => {
    return {
      id: findMeasurement.id,
      ammonia: findMeasurement.ammonia ?? null,
      nitrates: findMeasurement.nitrates ?? null,
      phosphates: findMeasurement.phosphates ?? null,
    };
  }, [findMeasurement]);

  // States
  const [sampleDate, setSampleDate] = useState<Date | null>(findMeasurement.date ? new Date(findMeasurement.date) : null);
  const [basicParamsData, setBasicParamsData] = useState<IBasicParams>(basicParamsToUpdate as IBasicParams);
  const [orgIndParamsData, setOrgIndParamsData] = useState<IOrgIndicatorParams>(orgIndParamsToUpdate as IOrgIndicatorParams);
  const [nutrientParamsData, setNutrientParamsData] = useState<INutrientParams>(nutrientParamsToUpdate as INutrientParams);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSampleDate(newDate);
  };

  const onChangeInput = <T extends IBasicParams | IOrgIndicatorParams | INutrientParams>(
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => (key: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      [key]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleBasicParamsChange = onChangeInput(setBasicParamsData);
  const handleOrgIndParamsChange = onChangeInput(setOrgIndParamsData);
  const handleNutrientParamsChange = onChangeInput(setNutrientParamsData);

  const toUpdateWaterQualityData = {
    date: sampleDate!,
    pH: parseInt(basicParamsData.pH!) || null,
    temperature: parseInt(basicParamsData.temperature!) || null,
    dissolvedOxygen: parseInt(basicParamsData.dissolvedOxygen!) || null,
    totalCOD: parseInt(orgIndParamsData.totalCOD!) || null,
    suspendedSolids: parseInt(orgIndParamsData.suspendedSolids!) || null,
    fecalColiform: parseInt(orgIndParamsData.fecalColiform!) || null,
    ammonia: parseFloat(nutrientParamsData.ammonia!) || null,
    nitrates: parseFloat(nutrientParamsData.nitrates!) || null,
    phosphates: parseFloat(nutrientParamsData.phosphates!) || null,
  };

  const callUpdateMeasurement = async () => {
    try {
      await updateMeasurement({
        id: findMeasurement.id,
        data: toUpdateWaterQualityData,
      }).unwrap();
      showToast({
        status: "success",
        message: "Water Quality Data Updated Successfully"
      });
    } catch (error: any) {
      showToast({
        status: "error",
        message: error.message || "Failed to update the selected water quality data"
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callUpdateMeasurement();
  };

  return {
    sampleDate,
    onDateChange,
    basicParamsData,
    orgIndParamsData,
    nutrientParamsData,
    isLoading,
    handleBasicParamsChange,
    handleOrgIndParamsChange,
    handleNutrientParamsChange,
    handleSubmit,
    toUpdateWaterQualityData,
  };
};

export default useUpdateWQData;
