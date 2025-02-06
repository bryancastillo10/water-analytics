import { createColumnHelper } from "@tanstack/react-table";
import type { IUsersData } from "@/features/user/api/interface";
import { CustomSelect } from "@/components/ui";


const columnHelper = createColumnHelper<IUsersData>();

interface UserColumnsProps{
    openEditRole: Record<string, boolean>;
    toggleEditRole: (rowId: string) => void;
    selectedRole: Record<string,string>;
    handleSelectedRole: (rowId: string, newRole:string) => void;
}

export const userColumns = ({
        openEditRole,
        toggleEditRole,
        selectedRole,
        handleSelectedRole
    }: UserColumnsProps) => [

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
    const rowId = info.row.id; 
    const currentRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    const isEditing = openEditRole[rowId] || false; 

    return (
      <div className="grid grid-cols-2 items-center w-[250px] gap-2">
        {isEditing ? (
          <>
            <CustomSelect
              value={selectedRole[rowId] || currentRole}
              onChangeValue={(newRole)=> handleSelectedRole(rowId,newRole)}
              withSearchBar={false}
              options={["Admin", "Public", "Analyst"]}
            />
            <div className="flex w-[180px] items-center gap-2">
            <button className="bg-primary w-full text-light 
            text-sm  px-3 py-1 rounded-xl shadow-md">
              Save
            </button>
            <button className="bg-rose-600 text-light
            text-sm w-fit px-3 py-1 rounded-xl shadow-md"
                onClick={()=>toggleEditRole(rowId)}            
            >
              Cancel
            </button>
            </div>
          </>
        ) : (
          <p className="w-full">{currentRole}</p>
        )}
      </div>
    );
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