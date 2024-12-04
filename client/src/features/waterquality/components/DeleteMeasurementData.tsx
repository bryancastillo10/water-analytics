import { useMemo } from "react";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import { CalendarBlank } from "@phosphor-icons/react";

import { useAppSelector } from "@/lib/redux/hooks";
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
      pH: findMeasurement.pH,
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


  return (
    <form>
        <h1 className="text-xl my-2">Are you sure you want to delete this data?</h1>
        <div className="grid grid-cols-2 items-center mb-2">
          <h1 className="flex items-center gap-x-2"><CalendarBlank size="20" /> Sampling Date</h1>
          <p className={`${theme ? "text-secondary" : "text-primary"} font-semibold text-pretty`}>{formatDate(findMeasurement.date)}</p>
        </div>

    </form>
  )
}

export default DeleteMeasurementData
