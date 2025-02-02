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
        cell: (info) => {
            const role = info.getValue();
            const renderRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
            return <p>{renderRole}</p>;
        },
    }),    
    columnHelper.accessor("profilePic", {
        header: () => "Profile Picture",
        cell: (info) => (
            <img
                src={info.getValue()}
                alt="user-profile-pic"
                className="size-10 rounded-full"
            />
        )
    }),
];