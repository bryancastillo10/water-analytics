import TextHeader from '@/components/common/TextHeader';
import { Switch, Button } from '@/components/ui';
import { Palette, ShieldCheck, Bell } from '@phosphor-icons/react';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setIsDarkMode } from '@/lib/redux/states/themeSlice';

const AppSettings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.isDarkMode);

   const toggleSwitch = () => {
        dispatch(setIsDarkMode(!theme));
    }
  return (
    <section className="px-6 py-4">
        <TextHeader text="App Settings" />
        <section className="grid grid-cols-3 place-items-start gap-y-3">
                <div className="col-span-2 flex items-center gap-2">
                    <Palette size="24"/> 
                    <h1 className="text-lg font-semibold">Theme</h1>
              </div>
              <div className="my-2">
                  <Switch isOn={theme} toggleSwitch={toggleSwitch} />
              </div>
            <div className="col-span-2 flex items-center gap-2">
                <ShieldCheck size="24"/> 
                <h1 className="text-lg font-semibold">Reset Password</h1>
              </div>
              <div className=" my-2">
                  <Button variant="primary">Reset</Button>
              </div>
            <div className="col-span-2 flex items-center gap-2">
                <Bell size="24"/> 
                  <h1 className="text-lg font-semibold">Email Notifications</h1>
            </div>
            
        
        </section>
    </section>
  )
}

export default AppSettings
