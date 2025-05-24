import { createColumnHelper } from '@tanstack/react-table';
import { type IThresholdData } from '@/features/thresholds/api/interface';
import { parameterRecord } from '@/lib/mappings/parameterRecord';

const columnHelper = createColumnHelper<IThresholdData>();

export const thresholdColumns = [
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
  columnHelper.accessor(
    row => {
      if (row.parameter === 'pH') {
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Min:</span>
              <span className="">{row.minValue}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold">Max:</span>
              <span className="">{row.maxValue}</span>
            </div>
          </div>
        );
      }
      return row.value;
    },
    {
      header: 'Value',
      cell: info => info.getValue(),
    },
  ),
];
