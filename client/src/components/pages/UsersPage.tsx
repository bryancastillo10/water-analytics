import { TextHeader } from "@/components/common";
import UsersListTable from "@/features/user/components/UsersListTable";

const UsersPage = () => {
  return (
    <main className="flex flex-col xl:gap-4">
      <div className="w-fit">
        <TextHeader text="Admins can check the list of users" />
      </div>
          <UsersListTable/>
    </main>
  )
}

export default UsersPage;
