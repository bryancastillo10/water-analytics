import { useState, useMemo, useEffect, type ChangeEvent } from "react";
import { FormSubheader } from "@/components/common";
import { FormInput } from "@/components/ui";
import { FormButtons } from "@/components/layout";
import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";
import { BasicParamsTable, OrgIndParamsTable, NutrientParamsTable } from "@/features/waterquality/tables";

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

  

  return (
    <form onSubmit={()=> {}}>
      <div className="grid grid-cols-1 w-[50%]">
        <FormInput
          id="date"
          type="date"
          label="Sampling Date"
          icon={CalendarBlank}
          value={sampleDate?.toISOString()?.split('T')[0] ?? ''}
          onChange={onDateChange}
          />   
      </div>
      <FormSubheader icon={Drop} text="Basic Water Quality Parameters" />
      <BasicParamsTable
        paramsData={basicParamsData}
        onChangeInput={handleBasicParamsChange}
      />
      <FormSubheader icon={Hexagon} text="Organic Pollution Indicators" />
      <OrgIndParamsTable
        paramsData={orgIndParamsData}
        onChangeInput={handleOrgIndParamsChange}
      />
      <FormSubheader icon={Plant} text="Nutrient Pollution Indicators" />
      <NutrientParamsTable 
        paramsData={nutrientParamsData}
        onChangeInput={handleNutrientParamsChange}  
      />
      <FormButtons primaryBtnLabel="Update" /> 
    </form>
  )
}

export default UpdateMeasurementData;