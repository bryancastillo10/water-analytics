import { TrashSimple, ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useGetAllUserQuery } from "@/features/user/api/userApi";
import { mockUsersData } from "@/features/user/api/mockData";
import { userColumns } from "@/features/user/lib/allUsersTable";

const UsersListTable = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const authUser = useAppSelector((state) => state.user);

  const userId = authUser?.user_id!;

  const { data: allUsers } = useGetAllUserQuery({ userId });
  
  const table = useReactTable({
    data: mockUsersData || [],
    columns: userColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel()
  })
  
  console.log(allUsers);
  return (
    <table className="table-auto xl:table-fixed w-full border-collapse mt-4 relative group">
          <thead>
            <tr>
              <th>
                <div
                  className={`flex items-center gap-x-2 absolute opacity-0 group-hover:opacity-100 cursor-pointer duration-300 ease-in-out
                      border border-dashed -top-10 right-0
                      rounded-full p-2 hover:scale-110  ${theme ? "border-light" : "border-dark"}`}
                >
                  <TrashSimple size="20" />
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

export default UsersListTable;
