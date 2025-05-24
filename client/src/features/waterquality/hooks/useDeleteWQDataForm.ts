import { useMemo, useState, useEffect, type FormEvent } from 'react';

import { useDeleteMeasurementMutation } from '@/features/waterquality/api/measurementApi';
import { useToast } from '@/hooks/useToast';
import useDrawer from '@/hooks/useDrawer';
import type { IMeasurementData } from '@/features/waterquality/api/interface';
import type {
  IBasicParams,
  IOrgIndicatorParams,
  INutrientParams,
} from '@/features/waterquality/tables/interface';
import { formatDate } from '@/features/waterquality/lib/formatDate';

const useDeleteWQDataForm = (findMeasurement: IMeasurementData) => {
  const [deleteMeasurement, { isLoading }] = useDeleteMeasurementMutation();
  const { handleCloseDrawer } = useDrawer();
  const { showToast } = useToast();

  // Data Pre-processing
  const basicParamsToDelete = useMemo(() => {
    return {
      id: findMeasurement.id,
      pH: findMeasurement.pH,
      temperature: findMeasurement.temperature,
      dissolvedOxygen: findMeasurement.dissolvedOxygen,
    };
  }, [findMeasurement]);

  const orgIndParamsToDelete = useMemo(() => {
    return {
      id: findMeasurement.id,
      totalCOD: findMeasurement.totalCOD,
      suspendedSolids: findMeasurement.suspendedSolids,
      fecalColiform: findMeasurement.fecalColiform,
    };
  }, [findMeasurement]);

  const nutrientParamsToDelete = useMemo(() => {
    return {
      id: findMeasurement.id,
      ammonia: findMeasurement.ammonia,
      nitrates: findMeasurement.nitrates,
      phosphates: findMeasurement.phosphates,
    };
  }, [findMeasurement]);

  // States
  const [sampleDate, setSampleDate] = useState<Date | null>(null);
  const [basicParamsData] = useState<IBasicParams>(basicParamsToDelete as IBasicParams);
  const [orgIndParamsData] = useState<IOrgIndicatorParams>(
    orgIndParamsToDelete as IOrgIndicatorParams,
  );
  const [nutrientParamsData] = useState<INutrientParams>(nutrientParamsToDelete as INutrientParams);

  useEffect(() => {
    if (findMeasurement?.date) {
      setSampleDate(new Date(findMeasurement.date));
    }
  }, [findMeasurement]);

  const dateToRender = formatDate(sampleDate?.toISOString()!);
  const id = findMeasurement.id;

  const callDeleteMeasurement = async () => {
    try {
      await deleteMeasurement({ id }).unwrap();
      showToast({
        status: 'success',
        message: 'Water Quality Data has been deleted',
      });

      handleCloseDrawer();
    } catch (error: any) {
      showToast({
        status: 'error',
        message: error.message || 'Failed to delete the selected water quality data',
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callDeleteMeasurement();
  };
  return {
    dateToRender,
    basicParamsData,
    orgIndParamsData,
    nutrientParamsData,
    isLoading,
    handleSubmit,
  };
};

export default useDeleteWQDataForm;
