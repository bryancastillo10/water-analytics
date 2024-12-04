import { useState, useMemo, type ChangeEvent } from "react";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";
import AddBasicParamsTable from "@/features/waterquality/tables/BasicParamsTable";

interface UpdateMeasurementProps{
  id: string;
  data: IMeasurementData[];
}

const UpdateMeasurementData = ({ id, data }: UpdateMeasurementProps) => {
  const findMeasurement = useMemo(() => {
    return data.find(measurement => measurement.id === id);
  }, [id, data]);

  if (!findMeasurement) {
    return (
      <div className="text-lg"> No Measurement Was Found with the ID</div>
    )
  };

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


  const [basicParamsData, setBasicParamsData] = useState<IBasicParams>(basicParamsToUpdate as IBasicParams);
  const [orgIndParamsData, setOrgIndParamsData] = useState<IOrgIndicatorParams>(orgIndParamsToUpdate as IOrgIndicatorParams);
  const [nutrientParamsData, setNutrientParamsData] = useState<INutrientParams>(nutrientParamsToUpdate as INutrientParams);

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

  console.log("Update", basicParamsData);

  return (
   <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Update Measurement</h2>
            <div className="space-y-2">
              <AddBasicParamsTable
                paramsData={basicParamsData}
                onChangeInput={handleBasicParamsChange}
              />
            </div>
    </div>
  )
}

export default UpdateMeasurementData;