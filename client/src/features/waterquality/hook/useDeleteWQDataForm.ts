import { useMemo, useState, useEffect } from "react";

import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";
import { formatDate } from "@/features/waterquality/lib/formatDate";

const useDeleteWQDataForm = (findMeasurement: IMeasurementData) => {
    // Data Pre-processing
    const basicParamsToDelete = useMemo(() => {
        return {
          id: findMeasurement.id,
          pH: findMeasurement.pH ,
          temperature: findMeasurement.temperature,
          dissolvedOxygen: findMeasurement.dissolvedOxygen
        };
      }, [findMeasurement]);
    
    
      const orgIndParamsToDelete = useMemo(() => {
        return {
            id: findMeasurement.id,
            totalCOD: findMeasurement.totalCOD,
            suspendedSolids: findMeasurement.suspendedSolids,
            fecalColiform: findMeasurement.fecalColiform
        }    
      }, [findMeasurement]);
    
      const nutrientParamsToDelete = useMemo(() => {
          return {
              id: findMeasurement.id,
              ammonia: findMeasurement.ammonia,
              nitrates: findMeasurement.nitrates,
              phosphates: findMeasurement.phosphates
          }
      }, [findMeasurement]);
    
    // States
    const [sampleDate, setSampleDate] = useState<Date | null>(null);
    const [basicParamsData ] = useState<IBasicParams>(basicParamsToDelete as IBasicParams);
    const [orgIndParamsData ] = useState<IOrgIndicatorParams>(orgIndParamsToDelete as IOrgIndicatorParams);
    const [nutrientParamsData ] = useState<INutrientParams>(nutrientParamsToDelete as INutrientParams);


    useEffect(() => {
      if (findMeasurement?.date) {
        setSampleDate(new Date(findMeasurement.date));
      }
    }, [findMeasurement]);
  
    const dateToRender = formatDate(sampleDate?.toISOString()!);
 
    return {
        dateToRender,
        basicParamsData,
        orgIndParamsData,
        nutrientParamsData,
    }
}

export default useDeleteWQDataForm;
