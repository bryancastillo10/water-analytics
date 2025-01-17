import { createColumnHelper } from "@tanstack/react-table";
import type { IUsersData } from "@/features/user/api/interface";

const columnHelper = createColumnHelper<IUsersData>();

export const userColumns = [
    columnHelper.accessor("username", {
        header: () => "Username",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("role", {
        header: () => "Role",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("profilePic", {
        header: () => "Profile Picture",
        cell: (info) => info.getValue()
    }),
];