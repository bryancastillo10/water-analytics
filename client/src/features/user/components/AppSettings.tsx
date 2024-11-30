import TextHeader from '@/components/common/TextHeader';
import { Switch } from '@/components/ui';
import SettingItem from '@/features/user/components/SettingItem';

import { Palette, Bell, Info, PaperPlane } from '@phosphor-icons/react';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setIsDarkMode } from '@/lib/redux/states/themeSlice';


const AppSettings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  const toggleSwitch = () => {
    dispatch(setIsDarkMode(!theme));
  }

  return (
    <section className="px-6 py-6">
      <TextHeader text="App Settings" />
      <div className="grid grid-cols-1  gap-6 mt-4">
      <div className="flex items-center justify-between p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className={`p-2 rounded-full ${theme ? "bg-darkGray text-secondary": "bg-primary text-light"}`}>
            <Palette size={24} />
          </div>
            <span className="font-semibold text-sm overflow-hidden">Theme</span>
          </div>
          <div><Switch isOn={theme} toggleSwitch={toggleSwitch} /></div>
        </div>
        <SettingItem
          icon={Bell}
          label="Email Notifications"
          btnLabel="Manage"
          action={()=>{}}
        />
        <SettingItem
          icon={PaperPlane}
          label="Newsletter Subscription"
          btnLabel="Subscribe"
          action={()=>{}}
        />
        <SettingItem
          icon={Info}
          label="App Info"
          btnLabel="View"
          action={()=>{}}
        />
      </div>
    </section>

  )
}

export default AppSettings
