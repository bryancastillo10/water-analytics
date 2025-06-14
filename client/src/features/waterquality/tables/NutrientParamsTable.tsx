import { useMemo } from 'react';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FormNumberInput } from '@/components/ui';

import type { INutrientParams, ParamsTableProps } from '@/features/waterquality/tables/interface';

const columnHelper = createColumnHelper<INutrientParams>();

const NutrientParamsTable = ({ paramsData, onChangeInput }: ParamsTableProps<INutrientParams>) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('ammonia', {
        header: () => (
          <>
            NH<sub>3</sub> as N
          </>
        ),
        cell: ({ row }) => {
          return (
            <FormNumberInput
              id="ammonia"
              value={row.original.ammonia}
              onChange={onChangeInput('ammonia')}
            />
          );
        },
      }),
      columnHelper.accessor('nitrates', {
        header: () => (
          <>
            NO<sub>3</sub>
            <sup>-</sup> as N
          </>
        ),
        cell: ({ row }) => {
          return (
            <FormNumberInput
              id="nitrates"
              value={row.original.nitrates}
              onChange={onChangeInput('nitrates')}
            />
          );
        },
      }),
      columnHelper.accessor('phosphates', {
        header: () => (
          <>
            PO<sub>4</sub>
            <sup>3-</sup> as P
          </>
        ),
        cell: ({ row }) => {
          return (
            <FormNumberInput
              id="phosphates"
              value={row.original.phosphates}
              onChange={onChangeInput('phosphates')}
            />
          );
        },
      }),
    ],
    [],
  );

  const data = useMemo(() => [paramsData], [paramsData]);
  const nutrientParamsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-fixed border-collapse w-full">
      <thead>
        {nutrientParamsTable.getHeaderGroups().map(headerGroup => (
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
        {nutrientParamsTable.getRowModel().rows.map(row => (
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

export default NutrientParamsTable;
