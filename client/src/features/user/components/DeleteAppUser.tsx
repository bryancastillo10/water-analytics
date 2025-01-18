import {
          Shield, 
          User, 
          Envelope,
          ShieldCheck,
          WarningCircle,
          type Icon 
} from "@phosphor-icons/react";
        
import { FormInput } from "@/components/ui";
import { FormButtons } from "@/components/layout";

import type { IUsersData } from "@/features/user/api/interface";
import { useAppSelector } from "@/lib/redux/hooks";


interface SelectedUserInfoProps{
  title: string;
  value: string;
  icon: Icon;
}

interface DeleteAppUserProps{
  id: string;
  data: IUsersData[];
}

const SelectedUserInfoRow = ({title, value, icon: Icon}: SelectedUserInfoProps) => {
  const theme = useAppSelector((state) => state.theme);

  return (
    <div className="grid grid-cols-2 items-center mb-2">
      <h1 className="flex items-center gap-x-2"><Icon size="20" />{title}</h1>
       <p className={`${theme ? "text-secondary":"text-primary"} font-semibold text-pretty`}>{value}</p>
    </div>
  )
};


const DeleteAppUser = ({ id,data }: DeleteAppUserProps) => {
  const selectedUser = data.find(user => user.id === id);


  return (
    <form onSubmit={() => {}}>
    <div className="grid grid-cols-2 items-center mb-2">
      <h1 className="text-xl my-2">Are you sure you want to delete this user?</h1>
          <div className="col-span-2">
            <SelectedUserInfoRow title="Username" icon={User} value={selectedUser?.username!} />
            <SelectedUserInfoRow title="Email" icon={Envelope} value={selectedUser?.email!} />
            <SelectedUserInfoRow title="User Role" icon={Shield} value={selectedUser?.role?.toLocaleLowerCase()!} />
            <div className="flex my-4 col-span-1">
              {selectedUser?.profilePic && 
                <img 
                  src={selectedUser?.profilePic} 
                  alt="selected-user-profile-pic" 
                  className="rounded-full shadow-md size-20"
                />}
            </div>
            <div className="mt-4">
                <FormInput
                    id="confirmUsername"
                    label="Confirm Username"
                    icon={ShieldCheck}
                    value={selectedUser?.username!}
                    onChange={() => {}}
                    validationMessage="Type your username to confirm account deletion"
                />
                  <p className="flex text-rose-600 items-center gap-2 text-sm my-2">
                    <span><WarningCircle size="20"/></span> Deleting your account means that all of your data related to this app will be deleted as well
                  </p>
                <FormButtons primaryBtnLabel="Delete" />
            </div>
          </div>
      </div>
    </form>  
  )
}

export default DeleteAppUser;
