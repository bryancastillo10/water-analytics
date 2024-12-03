import React, { useState, type ChangeEvent } from "react";
import { CalendarBlank, Drop, Hexagon, Plant } from "@phosphor-icons/react";

import { FormButtons } from "@/components/layout";
import { FormInput } from "@/components/ui";

import {AddBasicParamsTable, AddOrgIndTable, AddNutrientTable } from "@/features/waterquality/tables/interface";
import TextHeader from "@/components/common/TextHeader";

import type { IBasicParams, INutrientParams, IOrgIndicatorParams } from "@/features/waterquality/tables/interface";


const initBasicParams = {
  pH: null,
  temperature: null,
  dissolvedOxygen:null
}

const initOrgIndParams = {
  totalCOD: null,
  suspendedSolids: null,
  fecalColiform:null
}

const initNutrientParams = {
  ammonia: null,
  nitrates: null,
  phosphates:null
}


const AddMeasurementData = () => {
  const [sampleDate, setSampleDate] = useState<Date | null>(null);
  const [basicParamsData, setBasicParamsData] = useState<IBasicParams>(initBasicParams);
  const [orgIndParamsData, setOrgIndParamsData] = useState<IOrgIndicatorParams>(initOrgIndParams);
  const [nutrientParamsData, setNutrientParamsData] = useState<INutrientParams>(initNutrientParams);

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
      <div className="flex items-center gap-4 my-3">
        <Drop size="28"/>
        <TextHeader text="Basic Water Quality Parameter" fontSize="text-lg"/>
      </div>
      <AddBasicParamsTable
        paramsData={basicParamsData}
        onChangeInput={handleBasicParamsChange}
      />
      <div className="flex items-center gap-4 my-3">
        <Hexagon size="28"/>
        <TextHeader text="Organic Pollution Indicators" fontSize="text-lg"/>
      </div>
      <AddOrgIndTable
        paramsData={orgIndParamsData}
        onChangeInput={handleOrgIndParamsChange}
      />
      <div className="flex items-center gap-4 my-3">
        <Plant size="28"/>
        <TextHeader text="Nutrient Polution Indicators" fontSize="text-lg"/>
      </div>
        <AddNutrientTable 
          paramsData={nutrientParamsData}
          onChangeInput={handleNutrientParamsChange}  
      />

      <FormButtons primaryBtnLabel="Add" />
     
    </form>
  )
}

export default AddMeasurementData;
