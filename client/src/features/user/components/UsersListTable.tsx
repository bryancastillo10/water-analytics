import { TrashSimple } from "@phosphor-icons/react";

import { flexRender } from "@tanstack/react-table";

import { MainPageLoadingState } from "@/components/layout";
import useUserListTable from "../hooks/useUserListTable";

const UsersListTable = () => {
  const {
    hoveredRow,
    theme,
    isLoading,
    userTable,
    setHoveredRow,
    deleteUserDrawer
  } = useUserListTable();

  if (isLoading) {
    return <MainPageLoadingState />;
  }

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="relative group">
        {userTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border border-primary bg-primary text-light text-left px-3 py-2">
                <div {...{
                  className: header.column.getCanSort() ? "cursor-pointer select-none hover:text-neutral" : "",
                  onClick: header.column.getToggleGroupingHandler()
                }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext())}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {userTable.getRowModel().rows.map((row, rowIndex) => (
          <tr
            className={`relative ${theme ? "hover:bg-darkGray" : "hover:bg-neutral"}`}
            key={row.id}
            onMouseEnter={() => setHoveredRow(rowIndex)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
            <td colSpan={100}>
              {hoveredRow === rowIndex &&
                (<div className={`absolute right-2 top-2
                      flex items-center gap-2 p-2 rounded-xl ${theme ? "bg-secondary/80" : "bg-light/80"}`}>
                  <TrashSimple
                    onClick={() => deleteUserDrawer(row.original.id)}
                    weight="fill"
                    size="20"
                    className="hover:scale-110 duration-150 ease-in-out cursor-pointer"
                    color={theme ? "#F6F5F4" : "#006da3"}
                  />
                </div>)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default UsersListTable;