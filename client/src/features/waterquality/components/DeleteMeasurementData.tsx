import { useState, useMemo, useEffect } from "react";
import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";


import { useAppSelector } from "@/lib/redux/hooks";

import { FormSubheader } from "@/components/common";
import { FormButtons } from "@/components/layout";

import { BasicParamsTableView, NutrientParamsTableView, OrgIndParamsTableView } from "@/features/waterquality/tables";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";
import { formatDate } from "@/features/waterquality/lib/formatDate";

interface DeleteMeasurementDataProps{
  id: string;
  data: IMeasurementData[];
}

const DeleteMeasurementData = ({ id, data }: DeleteMeasurementDataProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  const findMeasurement = useMemo(() => {
    return data.find(measurement => measurement.id === id);
  }, [id, data]);

  if (!findMeasurement) {
    return (
      <div className="text-lg"> No Measurement Was Found with the ID</div>
    )
  };

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

  return (
    <form>
        <h1 className="text-xl my-2">Are you sure you want to delete the following data?</h1>
        <div className="grid grid-cols-2 items-center mb-2">
          <h1 className="flex items-center gap-x-2"><CalendarBlank size="20" /> Sampling Date</h1>
          <p className={`${theme ? "text-secondary" : "text-primary"} font-semibold text-pretty`}>{dateToRender}</p>
        </div>
        <FormSubheader 
          icon={Drop} 
          text="Basic Water Quality Parameters" 
        />
        <BasicParamsTableView 
          paramsData={basicParamsData} 
        />
        <FormSubheader 
          icon={Hexagon} 
          text="Organic Pollution Indicators" 
        />
        <OrgIndParamsTableView
          paramsData={orgIndParamsData}
        />
        <FormSubheader 
          icon={Plant} 
          text="Nutrient Pollution Indicators" 
        />
        <NutrientParamsTableView
          paramsData={nutrientParamsData}
        />
        <FormButtons primaryBtnLabel="Delete"/>
    </form>
  )
}

export default DeleteMeasurementData;
