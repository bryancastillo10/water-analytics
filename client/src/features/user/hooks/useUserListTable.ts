import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import useDrawer from "@/hooks/useDrawer";

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useGetAllUserQuery } from "@/features/user/api/userApi";
import { userColumns } from "@/features/user/lib/allUsersTable";

const useUserListTable = () => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const theme = useAppSelector((state) => state.theme.isDarkMode);
    const authUser = useAppSelector((state) => state.user);
    const { handleOpenDrawer } = useDrawer();
  
    // Get All User Query
    const userId = authUser?.user_id!;

    const { data: allUsers, isLoading } = useGetAllUserQuery({ userId });
    
    //  Delete User Drawer
    const deleteUserDrawer = (id: string) => {
        handleOpenDrawer("Delete Selected User Confirmation", "DeleteAppUser", { id, data: allUsers });
    };
    

    //  Delete User Table Config
    const userTable = useReactTable({
        data: allUsers || [],
        columns: userColumns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel()
    });
    
    return {
        hoveredRow,
        theme,
        isLoading,
        userTable,
        setHoveredRow,
        deleteUserDrawer
    }
}

export default useUserListTable;
