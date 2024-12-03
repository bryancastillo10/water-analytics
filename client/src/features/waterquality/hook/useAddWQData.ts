import { useState, type ChangeEvent } from "react";
import type { IBasicParams, INutrientParams, IOrgIndicatorParams } from "@/features/waterquality/tables/interface";


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
const useAddWQData = () => {
    const [sampleDate, setSampleDate] = useState<Date | null>(null);
    const [basicParamsData, setBasicParamsData] = useState<IBasicParams>(initBasicParams);
    const [orgIndParamsData, setOrgIndParamsData] = useState<IOrgIndicatorParams>(initOrgIndParams);
    const [nutrientParamsData, setNutrientParamsData] = useState<INutrientParams>(initNutrientParams);

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
        handleBasicParamsChange,
        handleOrgIndParamsChange,
        handleNutrientParamsChange,
        newWaterQualityData
    }
}

export default useAddWQData;
