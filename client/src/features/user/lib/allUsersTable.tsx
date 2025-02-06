import { createColumnHelper } from "@tanstack/react-table";
import type { IUsersData } from "@/features/user/api/interface";
import { CustomSelect } from "@/components/ui";

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
            // return <p>{renderRole}</p>;
            return <div className="grid grid-cols-2 items-center gap-2">
                        <CustomSelect
                            value={renderRole}
                            onChangeValue={()=>{}}
                            withSearchBar={false}
                            options={["Admin","Public","Analyst"]}
                        />
                        <button className="bg-primary text-light w-fit px-3 py-1 rounded-xl shadow-md">Save</button>
                    </div>;    
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