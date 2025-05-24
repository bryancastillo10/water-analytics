import { useMemo } from 'react';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FormNumberInput } from '@/components/ui';

import type { ParamsTableProps, IBasicParams } from '@/features/waterquality/tables/interface';

const columnHelper = createColumnHelper<IBasicParams>();

const BasicParamsTable = ({ paramsData, onChangeInput }: ParamsTableProps<IBasicParams>) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('pH', {
        header: () => 'pH Level',
        cell: ({ row }) => {
          return <FormNumberInput id="pH" value={row.original.pH} onChange={onChangeInput('pH')} />;
        },
      }),
      columnHelper.accessor('temperature', {
        header: () => 'Temperature',
        cell: ({ row }) => {
          return (
            <FormNumberInput
              id="temperature"
              value={row.original.temperature}
              onChange={onChangeInput('temperature')}
            />
          );
        },
      }),
      columnHelper.accessor('dissolvedOxygen', {
        header: () => 'Dissolved Oxygen',
        cell: ({ row }) => {
          return (
            <FormNumberInput
              id="dissolvedOxygen"
              value={row.original.dissolvedOxygen}
              onChange={onChangeInput('dissolvedOxygen')}
            />
          );
        },
      }),
    ],
    [],
  );

  const data = useMemo(() => [paramsData], [paramsData]);
  const basicParamsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-fixed border-collapse w-full">
      <thead>
        {basicParamsTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="border bg-primary text-light border-neutral text-left px-3 py-2"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {basicParamsTable.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicParamsTable;
