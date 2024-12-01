import { createColumnHelper } from "@tanstack/react-table";
import { type IThresholdData } from "@/features/thresholds/api/interface";

const columnHelper = createColumnHelper<IThresholdData>();

export const thresholdColumns = [
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
    cell: (info) => info.getValue()
  })
]
