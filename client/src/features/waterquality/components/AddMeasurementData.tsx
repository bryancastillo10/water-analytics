import { CalendarBlank, Drop, Hexagon, Plant } from '@phosphor-icons/react';

import { DrawerLoadingState, DrawerFetchError, FormButtons } from '@/components/layout';
import { FormSubheader } from '@/components/common';
import { FormInput } from '@/components/ui';

import {
  BasicParamsTable,
  OrgIndParamsTable,
  NutrientParamsTable,
} from '@/features/waterquality/tables';
import useAddWQDataForm from '@/features/waterquality/hooks/useAddWQDataForm';

const AddMeasurementData = ({ siteId }: { siteId: string }) => {
  const {
    sampleDate,
    onDateChange,
    basicParamsData,
    orgIndParamsData,
    nutrientParamsData,
    isLoading,
    handleSubmit,
    handleBasicParamsChange,
    handleOrgIndParamsChange,
    handleNutrientParamsChange,
  } = useAddWQDataForm(siteId);

  if (!siteId) {
    return <DrawerFetchError />;
  }

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
      <FormButtons loading={isLoading} primaryBtnLabel="Add" />
    </form>
  );
};

export default AddMeasurementData;
