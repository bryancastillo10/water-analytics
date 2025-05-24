import { flexRender } from '@tanstack/react-table';
import { PencilSimpleLine, TrashSimple } from '@phosphor-icons/react';

import { MainPageLoadingState } from '@/components/layout';
import useUserListTable from '@/features/user/hooks/useUserListTable';
import { useToast } from '@/hooks/useToast';

const UsersListTable = () => {
  const {
    allUsers,
    hoveredRow,
    theme,
    isLoading,
    userTable,
    error,
    setHoveredRow,
    deleteUserDrawer,
    toggleEditRole,
  } = useUserListTable();

  const { showToast } = useToast();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[70vh]">
        <MainPageLoadingState />
      </div>
    );
  }

  if (error) {
    showToast({
      status: 'warning',
      message: 'User Data is Available for Admin Role Only',
    });
  }

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="relative group">
        {userTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="border border-primary bg-primary text-light text-left px-3 py-2"
              >
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? 'cursor-pointer select-none hover:text-neutral'
                      : '',
                    onClick: header.column.getToggleGroupingHandler(),
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {allUsers && allUsers.length > 0 ? (
          userTable.getRowModel().rows.map((row, rowIndex) => (
            <tr
              className={`relative ${theme ? 'hover:bg-darkGray' : 'hover:bg-neutral'}`}
              key={row.id}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border border-neutral text-left px-3 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td colSpan={100}>
                {hoveredRow === rowIndex && (
                  <div
                    className={`absolute right-2 top-2
                      flex items-center gap-2 p-2 rounded-xl ${theme ? 'bg-secondary/80' : 'bg-light/80'}`}
                  >
                    <PencilSimpleLine
                      onClick={() => toggleEditRole(row.id)}
                      weight="fill"
                      size="20"
                      className="hover:scale-110 duration-150 ease-in-out cursor-pointer"
                      color={theme ? '#F6F5F4' : '#006da3'}
                    />
                    <TrashSimple
                      onClick={() => deleteUserDrawer(row.original.id)}
                      weight="fill"
                      size="20"
                      className="hover:scale-110 duration-150 ease-in-out cursor-pointer"
                      color={theme ? '#F6F5F4' : '#006da3'}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={userTable.getAllColumns().length}
              className="text-center font-semibold py-4 border border-neutral"
            >
              Failed to Fetch The User Data Available. This is available for Admin Role only.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default UsersListTable;
