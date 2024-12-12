import {  flexRender } from "@tanstack/react-table";

import type { IThresholdData } from "@/features/thresholds/api/interface";
import useUpdateThreshold from "@/features/thresholds/hooks/useUpdateThreshold";

import { FormButtons } from "@/components/layout";
import { LoadingAnimation } from "@/components/common";

interface UpdateThresholdFormProps{
  thresholdData: IThresholdData[];
}


const UpdateThresholdForm = ({thresholdData}:UpdateThresholdFormProps) => {
  const {  handleSubmit, isLoading, updateTable } = useUpdateThreshold({thresholdData});
  
  return (
    <form className="p-6 space-y-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
      {!isLoading ? <table className="table-fixed border-collapse w-full">
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
      </table> :
        <div className="w-full h-[60vh] flex justify-center items-center">
          <LoadingAnimation size="lg" />
        </div>}
      <div className="pt-4">
        <FormButtons
          loading={isLoading}
          primaryBtnLabel="Save"
        />
      </div>
    </form>)
}

export default UpdateThresholdForm;
