import { User, EnvelopeSimple, PencilSimpleLine, WarningCircle, ShieldCheck} from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

import TextHeader from "@/components/common/TextHeader";
import { Button } from "@/components/ui";
import useDrawer from "@/hook/useDrawer";

const UserProfile = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const user = useAppSelector((state) => state.user);

  const { handleOpenDrawer } = useDrawer();
  const userId = "sample_userId";
  
  const updateUserDrawer = (id: string) => {
    handleOpenDrawer("Edit Your Profile", "UpdateUserForm", {id});
  };

  const updateProfilePictureDrawer = () => {
    handleOpenDrawer("Update Your Profile Picture", "UpdateProfilePicture");
  };

  const resetPasswordDrawer = () => {
    handleOpenDrawer("Reset Your Password","ResetPasswordForm")
  }

  const deleteUserDrawer = () => {
    handleOpenDrawer("Delete Account Confirmation", "DeleteAccountConfirmation");
  };


  return (
    <section className="px-6 py-4">
      <TextHeader text="User Profile" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Profile Picture  */}
                <div 
                className="relative grid place-items-center md:place-items-start group"
                >
                  <img
                  className="shadow-md object-cover size-[150px] rounded-full duration-300 ease-out group-hover:scale-110"
                  src={user.profilePic ||"https://i.pravatar.cc/150?img=55"}
                  alt="avatar"
                  />
                <PencilSimpleLine 
                  onClick={()=>updateProfilePictureDrawer()}
                  className="absolute hidden group-hover:block right-10 bottom-0 cursor-pointer border border-dashed 
                  hover:border-primary hover:text-primary rounded-full p-1" 
                  size="28"
                  />
        </div>
              {/* User Details */}
        <div className="col-span-2 flex group flex-col justify-between border border-transparent border-dashed 
            hover:border-primary duration-300 ease-in-out rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <User size={24} />
              <h2 className="text-lg font-semibold">Username</h2>
              </div>
              <div className="hidden group-hover:flex hover:text-primary items-center  cursor-pointer">
                <PencilSimpleLine size={20} onClick={()=>updateUserDrawer(userId)} />
              </div>
            </div>
            <p className={`${theme ? "text-secondary" :"text-primary"} text-base mt-1`}>{user.username || "username"}</p>
            <div className="mt-4">
            <div className="flex items-center gap-x-2">
                <EnvelopeSimple size={24}  />
                <h2 className="text-lg font-semibold">Email</h2>
              </div>
              <p className={`${theme ? "text-secondary" :"text-primary"} text-base mt-1`}>{user.email || "your_email@domain.com"}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-center xl:justify-start gap-4 w-full ">
        <Button action={()=>resetPasswordDrawer()} fontSize="text-sm" variant="outline">
            <span className="flex items-center gap-1">
              <ShieldCheck size="14"/> Reset Password
            </span>
          </Button>
          <Button action={()=> deleteUserDrawer()} fontSize="text-sm" variant="danger">
            <span className="flex items-center gap-1">
              <WarningCircle size="14"/> Delete Account
            </span>
          </Button>
          </div>
    </section>
  )
}

export default UserProfile;
