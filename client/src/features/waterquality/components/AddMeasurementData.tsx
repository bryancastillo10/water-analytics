import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";

import { FormButtons } from "@/components/layout";
import { FormSubheader } from "@/components/common";
import { FormInput } from "@/components/ui";

import { BasicParamsTable, OrgIndParamsTable, NutrientParamsTable } from "@/features/waterquality/tables";
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
      <FormButtons primaryBtnLabel="Add" /> 
    </form>
  )
}

export default AddMeasurementData;
