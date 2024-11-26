import TextHeader from '@/components/common/TextHeader';
import { Palette, ShieldCheck, Bell } from '@phosphor-icons/react';

const AppSettings = () => {
  return (
    <section className="px-6 py-4">
        <TextHeader text="App Settings" />
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Palette size="24"/> 
                <h1 className="text-lg font-semibold">Theme</h1>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck size="24"/> 
                <h1 className="text-lg font-semibold">Reset Password</h1>
            </div>
            <div className="flex items-center gap-2">
                <Bell size="24"/> 
                <h1 className="text-lg font-semibold">Email Notifications</h1>
            </div>
        </div>
    </section>
  )
}

export default AppSettings
