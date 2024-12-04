import { useMemo } from "react";
import type { IMeasurementData } from "@/features/waterquality/api/interface";

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

  const selectedMeasurement = Object.entries(findMeasurement);
  console.log(selectedMeasurement);
  return (
   <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Update Measurement</h2>
            <div className="space-y-2">
                {selectedMeasurement.map(([key, value]) => (
                    <div key={key} className="flex">
                        <span className="font-medium mr-2 capitalize">{key}:</span>
                        <span>{value?.toString() || 'N/A'}</span>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default UpdateMeasurementData;