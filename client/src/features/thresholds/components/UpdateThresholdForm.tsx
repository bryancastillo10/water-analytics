import {  flexRender } from "@tanstack/react-table";

import type { IThresholdData } from "@/features/thresholds/api/interface";
import { FormButtons } from "@/components/layout";
import useUpdateThreshold from "../hooks/useUpdateThreshold";


interface UpdateThresholdFormProps{
  thresholdData: IThresholdData[];
}


const UpdateThresholdForm = ({thresholdData}:UpdateThresholdFormProps) => {
  const { updateTable } = useUpdateThreshold({thresholdData});
  
  return (
    <form className="p-6 space-y-4 rounded-lg shadow-md" onSubmit={()=>{}}>
      <table className="table-fixed border-collapse w-full">
          <thead>
          {updateTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border bg-primary text-light border-neutral text-left px-3 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
          {updateTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                    {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}</td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
      <div className="pt-4">
        <FormButtons primaryBtnLabel="Save" />
      </div>
    </form>)
}

export default UpdateThresholdForm;
