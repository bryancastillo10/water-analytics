import { useMemo } from "react";
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { FormNumberInput } from "@/components/ui";

import type { AddParamsTableProps, IOrgIndicatorParams } from "@/features/waterquality/tables/interface";


const columnHelper = createColumnHelper<IOrgIndicatorParams>();


const OrgIndParamsTable = ({paramsData, onChangeInput}:AddParamsTableProps<IOrgIndicatorParams>) => {     

    const columns = useMemo(() => [
        columnHelper.accessor("totalCOD", {
            header: () => "Total COD",
            cell: ({row}) => {
                return(
                <FormNumberInput
                id = "totalCOD"
                value={row.original.totalCOD}
                onChange={onChangeInput("totalCOD")}
            />
            )
            }     
        }),
        columnHelper.accessor("suspendedSolids", {
            header: () => "Suspended Solids",
            cell: ({row}) => {
                return(
                <FormNumberInput
                id = "suspendedSolids"
                value={row.original.suspendedSolids}
                onChange={onChangeInput("suspendedSolids")}
            />
            )
            }     
        }),
        columnHelper.accessor("fecalColiform", {
            header: () => "Fecal Coliform",
            cell: ({row}) => {
                return(
                <FormNumberInput
                id = "fecalColiform"
                value={row.original.fecalColiform}
                onChange={onChangeInput("fecalColiform")}
            />
            )
            }     
        }),
    ] ,[]) 
    
    const data = useMemo(() => [paramsData], [paramsData]);
    const orgIndParamsTable = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });


  return (     
    <table className="table-fixed border-collapse w-full">
      <thead>
        {orgIndParamsTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th 
                key={header.id} 
                className="border bg-primary text-light border-neutral text-left px-3 py-2"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {orgIndParamsTable.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td 
                key={cell.id} 
                className="border border-neutral text-left px-3 py-2"
              >
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
  ); 
};  

export default OrgIndParamsTable;