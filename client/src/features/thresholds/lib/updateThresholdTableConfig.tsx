import { createColumnHelper } from '@tanstack/react-table';
import { FormNumberInput } from '@/components/ui';

import type { IThresholdData } from '@/features/thresholds/api/interface';
import { parameterRecord } from '@/lib/mappings/parameterRecord';

const columnHelper = createColumnHelper<IThresholdData>();

export const updateThresholdColumnsConfig = (
  paramsValue: Record<string, string | { minValue: string; maxValue: string }>,
  onChangeValue: (parameter: string, value: string) => void,
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>,
) => [
  columnHelper.accessor('parameter', {
    header: () => 'Parameter',
    cell: info => {
      const parameterInfo = info.getValue();
      const parameterLabel =
        Object.entries(parameterRecord).find(
          ([_, mappedParam]) => mappedParam === parameterInfo,
        )?.[0] || parameterInfo;
      return parameterLabel;
    },
  }),
  columnHelper.accessor('unit', {
    header: () => 'Unit',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: () => 'Value',
    cell: ({ row }) => {
      const { parameter } = row.original;
      if (parameter === 'pH') {
        const phValue = paramsValue[parameter] as { minValue: string; maxValue: string };

        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">Min</p>
              <FormNumberInput
                id={`${parameter}-min`}
                ref={el => (inputRefs.current[`${parameter}-min`] = el)}
                value={phValue.minValue}
                onChange={e => onChangeValue(`${parameter}-min`, e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">Max</p>
              <FormNumberInput
                id={`${parameter}-max`}
                ref={el => (inputRefs.current[`${parameter}-max`] = el)}
                value={phValue.maxValue}
                onChange={e => onChangeValue(`${parameter}-max`, e.target.value)}
              />
            </div>
          </div>
        );
      } else {
        return (
          <FormNumberInput
            id={parameter}
            ref={el => (inputRefs.current[parameter] = el)}
            value={paramsValue[parameter] as string}
            onChange={e => onChangeValue(parameter, e.target.value)}
          />
        );
      }
    },
  }),
];
