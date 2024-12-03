
import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";

import { FormButtons } from "@/components/layout";
import { FormInput } from "@/components/ui";

import {AddBasicParamsTable, AddOrgIndTable, AddNutrientTable } from "@/features/waterquality/tables/interface";
import TextHeader from "@/components/common/TextHeader";

const AddMeasurementData = () => {
  
  return (
    <form>
      <div className="grid grid-cols-1 w-[50%]">
        <FormInput
          id="date"
          type="date"
          label="Sampling Date"
          icon={CalendarBlank}
          value=""
          onChange={()=>{}}
          />   
      </div>
      <div className="flex items-center gap-4 my-3">
        <Drop size="28"/>
        <TextHeader text="Basic Water Quality Parameter" fontSize="text-lg"/>
      </div>
      <AddBasicParamsTable />
      <div className="flex items-center gap-4 my-3">
        <Hexagon size="28"/>
        <TextHeader text="Organic Pollution Indicators" fontSize="text-lg"/>
      </div>
      <AddOrgIndTable />
      <div className="flex items-center gap-4 my-3">
        <Plant size="28"/>
        <TextHeader text="Nutrient Polution Indicators" fontSize="text-lg"/>
      </div>
        <AddNutrientTable />

      <FormButtons primaryBtnLabel="Add" />
     
    </form>
  )
}

export default AddMeasurementData;
