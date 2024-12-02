import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

import { ArrowUp, ArrowDown, PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

import { waterQualityColumns } from "@/features/waterquality/lib/waterQualityTableConfig";
import type { IMeasurementData } from "@/features/waterquality/api/interface";


interface WaterQualityTableProps {
  data: IMeasurementData[];
}

const WaterQualityTable = ({ data }: WaterQualityTableProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
 
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
              <th key={header.id} className="border border-primary bg-primary text-light text-left px-3 py-2">
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
        {waterTable.getRowModel().rows.map((row, rowIndex) => (
          <tr
            className="relative hover:bg-neutral"
            key={row.id}
            onMouseEnter={() => setHoveredRow(rowIndex)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
            <td colSpan={100}>
              { hoveredRow === rowIndex &&
              (<div className="absolute right-0 top-0 border border-neutral border-dashed
                    flex items-center gap-2 p-2 rounded-xl">
                <PencilSimpleLine
                  weight="fill"
                  size="20"
                  className="hover:scale-110 duration-150 ease-in-out cursor-pointer"
                  color={theme ? "#F6F5F4": "#006da3"}
                />
                <TrashSimple
                  weight="fill"
                  size="20"
                  className="hover:scale-110 duration-150 ease-in-out cursor-pointer"
                  color={theme ? "#F6F5F4": "#006da3"}  
                />
              </div>)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WaterQualityTable;
