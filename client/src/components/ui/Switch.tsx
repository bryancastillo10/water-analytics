import { Sun, Moon } from "@phosphor-icons/react";

interface SwitchProps{
    isOn: boolean;
    toggleSwitch: () => void;
}

const Switch = ({isOn,toggleSwitch}:SwitchProps) => {
  return (
      <div
          className={`h-8 w-16 rounded-3xl shadow-lg  cursor-pointer relative
          ${isOn ? "bg-darkGray":"bg-neutral"}
          `}
          onClick={toggleSwitch}>
          <div
              className={`absolute top-1 transform transition-all left-2 size-6 rounded-full duration-300 ease-in-out hover:animate-pulse
                    ${isOn ? "translate-x-6 bg-secondary": "translate-x-0 bg-primary"}
              `} />
          {isOn ? <Sun size="18" className="absolute left-2 top-2 text-secondary duration-300 ease-in-out" />
              : <Moon size="18" className="absolute right-2 top-2 text-primary duration-300 ease-in-out" />}
    </div>
  )
}

export default Switch;
