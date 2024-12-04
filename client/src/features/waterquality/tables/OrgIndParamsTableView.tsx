import { useMemo } from "react";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";

import { viewOrgIndParamsTable } from "@/features/waterquality/lib/viewWQTableConfig";
import type { IOrgIndicatorParams, ParamsTableProps } from "@/features/waterquality/tables/interface";

const OrgIndParamsTableView = ({ paramsData }: Partial<ParamsTableProps<IOrgIndicatorParams>>) => {
    const data = useMemo(() => (paramsData ? [paramsData] : []), [paramsData]);
    const orgIndParamsTable = useReactTable({
        data,
        columns: viewOrgIndParamsTable,
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
  )
}

export default OrgIndParamsTableView
