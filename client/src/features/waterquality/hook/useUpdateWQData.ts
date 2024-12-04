import { useState, useMemo, useEffect, type ChangeEvent } from "react";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";

const useUpdateWQData = (findMeasurement: IMeasurementData) => {
    // Data pre-processing
    const basicParamsToUpdate = useMemo(() => {
        return {
          id: findMeasurement.id,
          pH: findMeasurement.pH,
          temperature: findMeasurement.temperature,
          dissolvedOxygen: findMeasurement.dissolvedOxygen
        };
      }, [findMeasurement]);
    
    
      const orgIndParamsToUpdate = useMemo(() => {
        return {
            id: findMeasurement.id,
            totalCOD: findMeasurement.totalCOD,
            suspendedSolids: findMeasurement.suspendedSolids,
            fecalColiform: findMeasurement.fecalColiform
        }    
      }, [findMeasurement]);
    
      const nutrientParamsToUpdate = useMemo(() => {
          return {
              id: findMeasurement.id,
              ammonia: findMeasurement.ammonia,
              nitrates: findMeasurement.nitrates,
              phosphates: findMeasurement.phosphates
          }
      }, [findMeasurement]);
    
    //   States
    const [sampleDate, setSampleDate] = useState<Date | null>(null);
    const [basicParamsData, setBasicParamsData] = useState<IBasicParams>(basicParamsToUpdate as IBasicParams);
    const [orgIndParamsData, setOrgIndParamsData] = useState<IOrgIndicatorParams>(orgIndParamsToUpdate as IOrgIndicatorParams);
    const [nutrientParamsData, setNutrientParamsData] = useState<INutrientParams>(nutrientParamsToUpdate as INutrientParams);
  

    useEffect(() => {
        if (findMeasurement?.date) {
          setSampleDate(new Date(findMeasurement.date));
        }
      }, [findMeasurement]);
    
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
      
        const toUpdateWaterQualityData = {
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
        toUpdateWaterQualityData
    }
}

export default useUpdateWQData;
