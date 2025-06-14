import UserProfile from '@/features/user/components/UserProfile';
import AppSettings from '@/features/app-settings/components/AppSettings';
import ThresholdSettings from '@/features/thresholds/components/ThresholdSettings';

const Settings = () => {
  return (
    <main className="flex flex-col xl:gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <UserProfile />
        <AppSettings />
      </div>
      <div>
        <ThresholdSettings />
      </div>
    </main>
  );
};

export default Settings;
