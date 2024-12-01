import { useState } from "react";
import type { IThresholdData } from "@/features/thresholds/api/interface";
import { FormNumberInput } from "@/components/ui";

interface UpdateThresholdFormProps{
  thresholdData: IThresholdData[];
}


const initialData = [
  { id: "pH", label: "pH", unit: "", value: 7 },
  { id: "cod", label: "Total COD", unit: "mg/L", value: 100 },
  { id: "solids", label: "Suspended Solids", unit: "mg/L", value: 150 },
  { id: "ammonia", label: "Ammonia", unit: "mg-N/L", value: 0.5 },
  { id: "phosphate", label: "Phosphate", unit: "mg/L", value: 1.2 },
];



const UpdateThresholdForm = ({thresholdData}:UpdateThresholdFormProps) => {
  console.log(thresholdData);
  const preprocessData = (data: typeof initialData) => {
    return data.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {} as Record<string, number>);
  };
  
  const [parameters, setParameters] = useState(() => preprocessData(initialData));
  


  return (
    <div className="p-6 space-y-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">
        Threshold Parameters
      </h2>
      {initialData.map((item) => (
      <FormNumberInput
        key={item.id}
        id={item.id}
        label={item.label}
        unit={item.unit}
        value={parameters[item.id]!} // Access the current value
        onChange={(value:number) =>
          setParameters((prev) => ({ ...prev, [item.id]: value }))
        }
        placeholder={`e.g., ${item.value}`}
      />
    ))}
    
    </div>)
}

export default UpdateThresholdForm;
