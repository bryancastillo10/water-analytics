import TextHeader from "@/components/common/TextHeader";

const Settings = () => {
  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-2 w-[500px] items-center gap-4">
        <TextHeader text="User Profile" />
        <TextHeader text="App Settings" />
      </div>
      <TextHeader text="Treshold Values Settings" />
   </main>
  )
}

export default Settings;
