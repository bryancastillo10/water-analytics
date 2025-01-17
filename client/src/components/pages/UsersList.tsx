import { TextHeader } from "@/components/common";
import UsersListTable from "@/features/user/components/UsersListTable";

const UsersList = () => {
  return (
    <main className="flex flex-col xl:gap-4">
          <TextHeader text="Admins can check list of users" />
          <UsersListTable/>
    </main>
  )
}

export default UsersList;
