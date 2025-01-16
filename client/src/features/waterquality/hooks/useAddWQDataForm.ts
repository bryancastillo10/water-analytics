import { useState, type ChangeEvent, type FormEvent } from "react";
import { useToast } from "@/hooks/useToast";
import type { IBasicParams, INutrientParams, IOrgIndicatorParams } from "@/features/waterquality/tables/interface";

import { useCreateMeasurementMutation } from "@/features/waterquality/api/measurementApi";

const initBasicParams = {
    pH: null,
    temperature: null,
    dissolvedOxygen:null
  }
  
  const initOrgIndParams = {
    totalCOD: null,
    suspendedSolids: null,
    fecalColiform:null
  }
  
  const initNutrientParams = {
    ammonia: null,
    nitrates: null,
    phosphates:null
  }
const useAddWQDataForm = (siteId: string) => {
    const [sampleDate, setSampleDate] = useState<Date | null>(null);
    const [basicParamsData, setBasicParamsData] = useState<IBasicParams>(initBasicParams);
    const [orgIndParamsData, setOrgIndParamsData] = useState<IOrgIndicatorParams>(initOrgIndParams);
    const [nutrientParamsData, setNutrientParamsData] = useState<INutrientParams>(initNutrientParams);
    
    const [ createMeasurement, { isLoading } ] = useCreateMeasurementMutation();
    const { showToast } = useToast();

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
                [key]: value
            }))
        };
  
  const handleBasicParamsChange = onChangeInput(setBasicParamsData);
  const handleOrgIndParamsChange = onChangeInput(setOrgIndParamsData);
  const handleNutrientParamsChange = onChangeInput(setNutrientParamsData);

  const newWaterQualityData = {
    date: sampleDate?.toISOString() ?? null,
    pH: parseFloat(basicParamsData.pH!) || null,
    temperature: parseFloat(basicParamsData.temperature!) || null,
    dissolvedOxygen: parseFloat(basicParamsData.dissolvedOxygen!) || null,
    totalCOD: parseInt(orgIndParamsData.totalCOD!) || null,
    suspendedSolids: parseInt(orgIndParamsData.suspendedSolids!) || null,
    fecalColiform: parseInt(orgIndParamsData.fecalColiform!) || null,
    ammonia: parseFloat(nutrientParamsData.ammonia!) || null,
    nitrates: parseFloat(nutrientParamsData.nitrates!) || null,
    phosphates: parseFloat(nutrientParamsData.phosphates!) || null,
  } 
  
  const callAddMeasurement = async () => {
    try {
      const res = await createMeasurement({
        id: siteId,
        data: newWaterQualityData
      }).unwrap();

      showToast({
        status: "success",
        message: res.message || "Water quality data has been added"
      })
    }
    catch (error: any) {
      showToast({
        status: "error",
        message: error.message || "Failed to add a new data"
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callAddMeasurement();
  }
    

    return {
        sampleDate,
        onDateChange,
        basicParamsData,
        orgIndParamsData,
        nutrientParamsData,
        isLoading,
        handleSubmit,
        handleBasicParamsChange,
        handleOrgIndParamsChange,
        handleNutrientParamsChange,
        newWaterQualityData
    }
}

export default useAddWQDataForm;
