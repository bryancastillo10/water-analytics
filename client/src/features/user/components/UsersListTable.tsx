import { TrashSimple } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

import { useGetAllUserQuery } from "../api/userApi";

const UsersListTable = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const authUser = useAppSelector((state) => state.user);

  const userId = authUser?.user_id!;

  const { data : allUsers } = useGetAllUserQuery({ userId });
  
  console.log(allUsers);
  return (
    <table className="table-auto xl:table-fixed w-full border-collapse mt-4 relative group">
    <thead>
        <tr>
           <th>
              <div className={`flex items-center gap-x-2 absolute opacity-0 group-hover:opacity-100 cursor-pointer duration-300 ease-in-out
                  border border-dashed -top-10 right-0
                  rounded-full p-2 hover:scale-110  ${theme ? "border-light" : "border-dark"}`}>
                    <TrashSimple size="20" />
                    <span className="text-sm hidden xl:block">Delete</span>
              </div>
           </th> 
        </tr>
        <tr>
          <th className="border bg-primary text-light border-neutral text-left px-3 py-2">
                
          </th>
        </tr>
    </thead>
</table>
  )
}

export default UsersListTable;
