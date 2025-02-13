import { createColumnHelper } from "@tanstack/react-table";
import { type IThresholdData } from "@/features/thresholds/api/interface";

const columnHelper = createColumnHelper<IThresholdData>();

export const thresholdColumns = [
  columnHelper.accessor("parameter", {
    header: () => "Parameter",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unit", {
    header: () => "Unit",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => {
    if (row.parameter === "pH") {
      return (
        <div className="grid grid-cols-2 justify-between">
          <p>Min: {row.minValue}</p>
          <p>Max: {row.maxValue}</p>
        </div>
    );
    }
    return row.value;
  }, {
    header: "Value",
    cell: (info) => info.getValue(),
  }),
];