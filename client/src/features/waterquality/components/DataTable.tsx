import { useState } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper, type ColumnDef, type SortingState } from "@tanstack/react-table";
import {
  CaretUp,
  CaretDown,
  PencilSimpleLine,
  TrashSimple,
} from "@phosphor-icons/react"; 
import { generateMockData, type Measurement } from "@/features/waterquality/api/mockData";


const columnHelper = createColumnHelper<Measurement>();

const mockData = generateMockData();

const columns: ColumnDef<Measurement, any>[] = [
  columnHelper.accessor("timestamp", {
    header: "Date",
    cell: (info) => (
      <div className="w-[100px]">
        <span className="text-ellipsis overflow-hidden">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("phLevel", {
    header: "pH",
    cell: (info) => info.getValue()?.toFixed(1) ?? "-",
  }),
  columnHelper.accessor("temperature", {
    header: "Temperature (°C)",
    cell: (info) => info.getValue()?.toFixed(1) ?? "-",
  }),
  columnHelper.accessor("dissolvedOxygen", {
    header: "DO (mg/L)",
    cell: (info) => info.getValue()?.toFixed(2) ?? "-",
  }),
  columnHelper.accessor("totalCOD", {
    header: "Total COD (mg/L)",
    cell: (info) => info.getValue()?.toFixed(1) ?? "-",
  }),
  columnHelper.accessor("suspendedSolids", {
    header: "Suspended Solids (mg/L)",
    cell: (info) => info.getValue()?.toFixed(1) ?? "-",
  }),
  columnHelper.accessor("fecalColiform", {
    header: "Fecal Coliform (MPN/100mL)",
    cell: (info) => info.getValue()?.toFixed(0) ?? "-",
  }),
  columnHelper.accessor("ammonia", {
    header: "Ammonia (mg/L)",
    cell: (info) => info.getValue()?.toFixed(2) ?? "-",
  }),
  columnHelper.accessor("nitrates", {
    header: "Nitrates (mg/L)",
    cell: (info) => info.getValue()?.toFixed(2) ?? "-",
  }),
  columnHelper.accessor("phosphates", {
    header: "Phosphates (mg/L)",
    cell: (info) => info.getValue()?.toFixed(2) ?? "-",
  }),
  columnHelper.accessor("siteId", {
    header: "Site",
    cell: (info) => (
      <span className="text-ellipsis overflow-hidden">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: () => (
      <div className="flex items-center text-primary space-x-2">
        <span className="text-sm  hover:scale-110 cursor-pointer">
          <PencilSimpleLine weight="fill" />
        </span>
        <span className="text-sm hover:scale-110 underline cursor-pointer">
          <TrashSimple weight="fill" />
        </span>
      </div>
    ),
  }),
];

interface WaterQualityTableProps {
  initialData?: Measurement[];
}

const WaterQualityTable: React.FC<WaterQualityTableProps> = ({
  initialData = mockData,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4">
        <table className="w-full shadow-md">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border border-neutral bg-primary "
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-2 text-left w-[300px] text-sm font-semibold text-light"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <CaretUp className="size-5" />,
                          desc: <CaretDown className="size-5" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-neutral hover:bg-neutral"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 text-sm text-darkGray ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default WaterQualityTable;