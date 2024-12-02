import React, { useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { FormNumberInput } from "@/components/ui";
import type { IThresholdData } from "@/features/thresholds/api/interface";
import { FormButtons } from "@/components/layout";

interface UpdateThresholdFormProps{
  thresholdData: IThresholdData[];
}


const columnHelper = createColumnHelper<IThresholdData>();
const UpdateThresholdForm = ({thresholdData}:UpdateThresholdFormProps) => {

  const preprocessData = (data: typeof thresholdData) => {
    return data.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {} as Record<string, number>);
  };
  
  const [paramsValue, setParamsValue] = useState(() => preprocessData(thresholdData));
  
  const onChangeValue = (id: string, value: number) => {
    setParamsValue({ ...paramsValue, [id]: value });
  };

  const updateThresholdColumns = [
    columnHelper.accessor("parameter", {
      header: () => "Parameter",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("unit", {
      header: () => "Unit",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("value", {
      header: () => "Value",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <FormNumberInput
            id={id}
            value={paramsValue[id]!}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(id, parseFloat(e.target.value) || parseFloat(""))}
          />
        )
      }
    })
  ];

  const updateTable = useReactTable({
    data: thresholdData,
    columns: updateThresholdColumns,
    getCoreRowModel: getCoreRowModel()
  })
  

  return (
    <form className="p-6 space-y-4 rounded-lg shadow-md">
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
                  <td className="border border-neutral text-left px-3 py-2">
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
