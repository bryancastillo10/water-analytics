import UserProfile from "@/features/user/components/UserProfile";
import AppSettings from "@/features/user/components/AppSettings";

const Settings = () => {
  return (
    <main className="flex flex-col xl:gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <UserProfile/>
        <AppSettings/>
      </div>
      <div className="">
        <div className="h-[35vh] bg-sky-500">Treshold Settings</div>
      </div>
   </main>
  )
}

export default Settings;
