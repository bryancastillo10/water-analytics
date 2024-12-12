import TextHeader from "@/components/common/TextHeader";
import { ArrowUp, ArrowDown, PencilSimpleLine } from "@phosphor-icons/react";

import { useAppSelector } from "@/lib/redux/hooks"
import useDrawer from "@/hook/useDrawer";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { sampleThresholds } from "@/features/thresholds/api/mockData";
import { thresholdColumns } from "@/features/thresholds/lib/thresholdTableConfig";
import { useGetThresholdQuery } from "../api/thresholdApi";

const ThresholdSettings = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const user = useAppSelector((state) => state.user);
  const userId = user.user_id ?? undefined;

  const { data: thresholdList, isLoading } = useGetThresholdQuery({id: userId!}, {skip: !userId});

  const { handleOpenDrawer } = useDrawer();

  const updateThreshold = () => {
    handleOpenDrawer("Edit your threshold values", "UpdateThresholdForm", { thresholdData: sampleThresholds });
  };

  const table = useReactTable({
    data: thresholdList || [],
    columns: thresholdColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="flex justify-center items-center xl:w-[50%]">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  }

  return (
    <section className="px-6 py-4 w-full xl:w-[50%]">
          <TextHeader text="Threshold Settings" />
      {thresholdList &&
(        <table className="table-auto xl:table-fixed w-full border-collapse mt-4 relative group">
          <thead>
            <tr>
              <th>
                <div
                  onClick={updateThreshold} 
                  className={`flex items-center gap-x-2 absolute opacity-0 group-hover:opacity-100 cursor-pointer duration-300 ease-in-out
                      border border-dashed -top-10 right-0
                      rounded-full p-2 hover:scale-110  ${theme ? "border-light" : "border-dark"}`}
                >
                  <PencilSimpleLine size="20" />
                  <span className="text-sm hidden xl:block">Edit</span>
                </div>
              </th>
            </tr>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border bg-primary text-light border-neutral text-left px-3 py-2"
                    >
                      <div
                        {...{
                          className: header.column.getCanSort() ? "cursor-pointer hover:text-neutral" : "",
                          onClick: header.column.getToggleGroupingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowUp />,
                          desc: <ArrowDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row)=> (
                <tr
                  className="relative"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                     
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>)}
    </section>
        )
      }
export default ThresholdSettings;
