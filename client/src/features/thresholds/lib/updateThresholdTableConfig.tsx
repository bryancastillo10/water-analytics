import { createColumnHelper } from "@tanstack/react-table";
import { FormNumberInput } from "@/components/ui";
import type { IThresholdData } from "@/features/thresholds/api/interface";

const columnHelper = createColumnHelper<IThresholdData>();

export const updateThresholdColumnsConfig = (
  paramsValue: Record<string, number>, 
  onChangeValue: (id: string, value: number) => void
) => [
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