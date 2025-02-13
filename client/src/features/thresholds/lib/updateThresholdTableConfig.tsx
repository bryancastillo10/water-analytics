import { createColumnHelper } from "@tanstack/react-table";
import { FormNumberInput } from "@/components/ui";
import type { IThresholdData } from "@/features/thresholds/api/interface";

const columnHelper = createColumnHelper<IThresholdData>();

export const updateThresholdColumnsConfig = (
  paramsValue: Record<string, string>,  
  onChangeValue: (parameter: string, value: string) => void,
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>
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
      const { parameter } = row.original;
      return (
        <FormNumberInput
          id={parameter}
          ref={(el) => (inputRefs.current[parameter] = el)} 
          value={paramsValue[parameter] ?? ""}
          onChange={(e) => onChangeValue(parameter, e.target.value)}
        />
      );
    }
  })
];
