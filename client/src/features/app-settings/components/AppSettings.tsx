import TextHeader from '@/components/common/TextHeader';
import { Switch } from '@/components/ui';
import SettingItem from '@/features/app-settings/components/SettingItem';
import useAppInfoDrawer from '@/features/app-settings/hooks/useAppInfoDrawer';

import { Palette, AppWindow, Info, Key } from '@phosphor-icons/react';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setIsDarkMode } from '@/lib/redux/states/themeSlice';


const AppSettings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  const {
      appOverviewDrawer,
      keyFeaturesDrawer,
      techHighlightsDrawer
  } = useAppInfoDrawer();
  
  const toggleSwitch = () => {
    dispatch(setIsDarkMode(!theme));
  };

  return (
    <section className="px-6 py-6">
      <TextHeader text="App  Info & Settings" />
      <div className="grid grid-cols-1  gap-6 mt-4">
      <div className={`flex items-center justify-between p-4 rounded-lg shadow-md ${theme ? "bg-darkGray" : "bg-light"}`}>
        <div className="flex items-center gap-4 overflow-hidden">
          <div className={`p-2 rounded-full ${theme ? "bg-neutral/40 text-secondary": "bg-primary text-light"}`}>
            <Palette size={24} />
          </div>
            <span className="font-semibold text-sm overflow-hidden">Theme</span>
          </div>
          <div><Switch isOn={theme} toggleSwitch={toggleSwitch} /></div>
        </div>
        <SettingItem
          icon={Info}
          label="Overview"
          btnLabel="Read Info"
          action={appOverviewDrawer}
        />
        <SettingItem
          icon={Key}
          label="Key Features"
          btnLabel="Learn More"
          action={keyFeaturesDrawer}
        />
        <SettingItem
          icon={AppWindow}
          label="Technical Details"
          btnLabel="Learn More"
          action={techHighlightsDrawer}
        />
      </div>
    </section>

  )
}

export default AppSettings
