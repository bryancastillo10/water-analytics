import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import useDrawer from "@/hooks/useDrawer";

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useGetAllUserQuery } from "@/features/user/api/userApi";
import { userColumns } from "@/features/user/utils/allUsersTable";

const useUserListTable = () => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [openEditRole, setOpenEditRole] = useState <Record<string, boolean>>({});
    const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});
    
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
    
    // Edit Role Toggle
    const toggleEditRole = (rowId: string) => {
        setOpenEditRole((prev) => ({
            ...prev,
            [rowId]: !prev[rowId]
        }))
    };
    
    const handleSelectedRole = (rowId: string, newRole: string) => {
        setSelectedRole((prev) => ({
            ...prev,
            [rowId]: newRole
        }));
    };
    

    //  Delete User Table Config
    const userTable = useReactTable({
        data: allUsers || [],
        columns: userColumns({
            openEditRole,
            toggleEditRole,
            selectedRole,
            handleSelectedRole
        }),
        debugTable: true,
        getCoreRowModel: getCoreRowModel()
    });
    
    return {
        hoveredRow,
        theme,
        isLoading,
        userTable,
        openEditRole,
        setHoveredRow,
        deleteUserDrawer,
        toggleEditRole
    }
}

export default useUserListTable;
