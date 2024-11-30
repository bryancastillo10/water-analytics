import { type Icon } from "@phosphor-icons/react";
import { Button } from "@/components/ui";
import { useAppSelector } from "@/lib/redux/hooks";

interface SettingItemProps {
    icon: Icon;
    label: string;
    action: () => void;
    btnLabel: string;
  }
  
const SettingItem = ({ icon: Icon, label, action, btnLabel }: SettingItemProps) => {
    const theme = useAppSelector((state) => state.theme.isDarkMode);
    
    return (
        <div className="flex items-center justify-between p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className={`p-2 rounded-full ${theme ? "bg-darkGray text-secondary": "bg-primary text-light"}`}>
            <Icon size={24} />
          </div>
          <span className="font-semibold text-sm overflow-hidden">{label}</span>
        </div>
        <div><Button action={action} variant="outline">{btnLabel}</Button></div>
      </div>
    )
} 

export default SettingItem;