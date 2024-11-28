import UserProfile from "@/features/user/components/UserProfile";
import AppSettings from "@/features/user/components/AppSettings";
import ThresholdSettings from "../components/ThresholdSettings";

const Settings = () => {
  return (
    <main className="flex flex-col xl:gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <UserProfile/>
        <AppSettings/>
      </div>
      <div className="">
        <ThresholdSettings/>
      </div>
   </main>
  )
}

export default Settings;
