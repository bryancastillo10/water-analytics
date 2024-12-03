
import { CalendarBlank } from "@phosphor-icons/react";

import { FormButtons } from "@/components/layout";
import { FormInput } from "@/components/ui";

import AddBasicParamsTable from "@/features/waterquality/forms/AddBasicParamsTable";

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
      <AddBasicParamsTable />
    
      <FormButtons primaryBtnLabel="Add" />
     
    </form>
  )
}

export default AddMeasurementData;
