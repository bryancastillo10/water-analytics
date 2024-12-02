import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { waterQualityColumns } from "@/features/waterquality/lib/waterQualityTableConfig";
import type { IMeasurementData } from "@/features/waterquality/api/interface";

interface WaterQualityTableProps {
  data: IMeasurementData[];
}

const WaterQualityTable = ({data}: WaterQualityTableProps) => {
  const waterTable = useReactTable({
    data,
    columns: waterQualityColumns,
    debugTable:true,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="relative group">
        {waterTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border bg-primary text-light border-neutral text-left px-3 py-2">
                <div {...{
                      className: header.column.getCanSort() ? "cursor-pointer hover:text-neutral" : "",
                      onClick: header.column.getToggleGroupingHandler()
                    }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext())}
                      {{
                        asc: <ArrowUp />,
                        desc: <ArrowDown/>
                      }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {waterTable.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WaterQualityTable;
