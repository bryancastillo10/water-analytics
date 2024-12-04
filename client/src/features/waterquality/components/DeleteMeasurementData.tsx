import { useMemo } from "react";
import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

import { FormSubheader } from "@/components/common";
import { FormButtons } from "@/components/layout";

import { BasicParamsTableView, NutrientParamsTableView, OrgIndParamsTableView } from "@/features/waterquality/tables";
import type { IMeasurementData } from "@/features/waterquality/api/interface";

import useDeleteWQDataForm from "../hook/useDeleteWQDataForm";

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

  const {
    dateToRender,
    basicParamsData,
    orgIndParamsData,
    nutrientParamsData,
  } = useDeleteWQDataForm(findMeasurement);

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
