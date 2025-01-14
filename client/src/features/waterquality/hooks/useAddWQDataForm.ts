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
const useAddWQDataForm = () => {
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

  const newMeasurement = {
    ...sampleDate,
    ...basicParamsData,
    ...orgIndParamsData,
    ...nutrientParamsData
  }
  
  const callAddMeasurement = async () => {
    try {
      // await createMeasurement().unwrap();
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
    
    const newWaterQualityData = {
        sampleDate,
        ...basicParamsData,
        ...orgIndParamsData,
        ...nutrientParamsData
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
