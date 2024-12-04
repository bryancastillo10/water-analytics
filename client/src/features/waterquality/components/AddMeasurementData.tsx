import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";

import { FormButtons } from "@/components/layout";
import { FormSubheader } from "@/components/common";
import { FormInput } from "@/components/ui";

import {AddBasicParamsTable, AddOrgIndTable, AddNutrientTable } from "@/features/waterquality/tables/interface";
import useAddWQData from "@/features/waterquality/hook/useAddWQData";

const AddMeasurementData = () => {
  const {
    sampleDate,
    onDateChange,
    basicParamsData,
    orgIndParamsData,
    nutrientParamsData,
    handleBasicParamsChange,
    handleOrgIndParamsChange,
    handleNutrientParamsChange,
  } = useAddWQData();

  console.log("Add",basicParamsData);
  return (
    <form>
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
      <AddBasicParamsTable
        paramsData={basicParamsData}
        onChangeInput={handleBasicParamsChange}
      />
      <FormSubheader icon={Hexagon} text="Organic Pollution Indicators" />
      <AddOrgIndTable
        paramsData={orgIndParamsData}
        onChangeInput={handleOrgIndParamsChange}
      />
      <FormSubheader icon={Plant} text="Nutrient Pollution Indicators" />
      <AddNutrientTable 
        paramsData={nutrientParamsData}
        onChangeInput={handleNutrientParamsChange}  
      />
      <FormButtons primaryBtnLabel="Add" /> 
    </form>
  )
}

export default AddMeasurementData;
