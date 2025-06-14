import { useMemo } from 'react';
import { CalendarBlank, Drop, Hexagon, Plant } from '@phosphor-icons/react';

import { FormSubheader } from '@/components/common';
import { FormInput } from '@/components/ui';
import { DrawerFetchError, DrawerLoadingState, FormButtons } from '@/components/layout';

import {
  BasicParamsTable,
  OrgIndParamsTable,
  NutrientParamsTable,
} from '@/features/waterquality/tables';
import type { IMeasurementData } from '@/features/waterquality/api/interface';
import useUpdateWQDataForm from '@/features/waterquality/hooks/useUpdateWQDataForm';

interface UpdateMeasurementProps {
  id: string;
  data: IMeasurementData[];
}

const UpdateMeasurementData = ({ id, data }: UpdateMeasurementProps) => {
  const findMeasurement = useMemo(() => {
    return data.find(measurement => measurement.id === id);
  }, [id, data]);

  if (!findMeasurement) {
    return <DrawerFetchError />;
  }

  const {
    sampleDate,
    onDateChange,
    basicParamsData,
    orgIndParamsData,
    nutrientParamsData,
    handleBasicParamsChange,
    handleOrgIndParamsChange,
    handleNutrientParamsChange,
    handleSubmit,
    isLoading,
  } = useUpdateWQDataForm(findMeasurement);

  return (
    <form onSubmit={handleSubmit}>
      {!isLoading ? (
        <>
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
          <BasicParamsTable paramsData={basicParamsData} onChangeInput={handleBasicParamsChange} />
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
        </>
      ) : (
        <DrawerLoadingState />
      )}
      <FormButtons loading={isLoading} primaryBtnLabel="Update" />
    </form>
  );
};

export default UpdateMeasurementData;
