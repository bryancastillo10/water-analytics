import { useState } from "react";
import TextHeader from "@/components/common/TextHeader";
import { ArrowUp, ArrowDown, PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";

import { useAppSelector } from "@/lib/redux/hooks"
import useDrawer from "@/hook/useDrawer";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { sampleThresholds } from "@/features/thresholds/api/mockData";
import { thresholdColumns } from "@/features/thresholds/lib/thresholdTableConfig";

const ThresholdSettings = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const isAdmin = true;
  const { handleOpenDrawer } = useDrawer();

  const updateThreshold = () => {
    handleOpenDrawer("Edit your threshold values", "UpdateThresholdForm", {thresholdData: sampleThresholds});
  }

  const deleteThreshold = (id:string) => {
    handleOpenDrawer("Delete a Threshold Parameter", "DeleteThresholdForm", { id });
  }

  const table = useReactTable({
    data: sampleThresholds,
    columns:thresholdColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  })


  return (
    <section className="px-6 py-4">
          <TextHeader text="Threshold Settings" />
          <table className=" table-cell xl:table-fixed w-full border-collapse">
            <thead className="relative group">
              <div className={`flex items-center gap-x-2 absolute opacity-0 group-hover:opacity-100 cursor-pointer duration-300 ease-in-out
                    border border-dashed 
                    rounded-full p-2 hover:scale-110 -top-6 right-0 ${theme ? "border-light" : "border-dark"}`}>
                <PencilSimpleLine 
                    onClick={updateThreshold}
                    size="20" 
                 />
                <span className="text-sm hidden xl:block">Edit</span>
              </div>
            {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows.map((row, rowIndex)=> (
                <tr
                  className="relative"
                  key={row.id}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={()=> setHoveredRow(null)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {hoveredRow === rowIndex && isAdmin ?
                        (<TrashSimple
                          size="24"
                          onClick={() => deleteThreshold(row.original.id)}
                          className={`absolute top-2 rounded-full p-1 -right-4 cursor-pointer duration-300 ease-in-out 
                            hover:scale-110 ${theme ? "bg-secondary" : "bg-neutral"}`} />)
                          : null}     
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
    </section>
        )
      }
export default ThresholdSettings;
