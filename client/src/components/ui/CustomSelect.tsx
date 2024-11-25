import { CaretDown, MagnifyingGlass, type Icon } from "@phosphor-icons/react";
import { useState } from "react";

interface SelectProps{
    options: string[];
    onChangeValue: (selection: string) => void;
    value?: string | null;
    width?: string;
    placeholder?: string;
    label?: string;
    icon?:Icon;
}

const CustomSelect = ({
    options,
    onChangeValue,
    width = "w-full",
    label = "Select Options",
    value,
    icon:Icon,
    placeholder = "Search for Options"  
}: SelectProps) => {
  const [isSelectOpened, setIsSelectOpened] = useState<boolean>(false);
  const [inputValue, setInputvalue] = useState<string>("");
    
  const openSelections = () => setIsSelectOpened(!isSelectOpened);
    return (
        <div className="flex flex-col relative">
          <div
            onClick={openSelections}
            className={`bg-white ${width} px-2 py-1 flex flex-col justify-between items-center border rounded-md
                      ${isSelectOpened ? "border-primary": "border-dark/20"}
                      `}>
            <div className="flex justify-between items-center w-full px-2 text-sm text-dark border-transparent focus:border-primary">
              <p className="flex items-center gap-x-1">
                {Icon && <Icon size="18" color="#040710" />}
                <span>{value ?? label}</span>
              </p>
                <CaretDown size="20" className={`transform ${isSelectOpened ? "rotate-180": "rotate-0"}`} />
            </div>
          </div>
        <ul 
          className={`absolute top-full mt-1 ${width}  bg-light overflow-y-auto z-50 border border-dark/20 rounded-md
            ${isSelectOpened ? "max-h-60" : "max-h-0 hidden"}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 px-2 sticky top-0 bg-light">
            <MagnifyingGlass size="18" />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputvalue(e.target.value.toLowerCase())}
              placeholder={placeholder}
              className="placholder:text-neutral text-sm w-full my-2 indent-2 py-1 px-2 outline-none border border-neutral focus:border-primary rounded-lg"
            />
          </div>
          {options.map((opt) => (
            <li
              key={opt}
              className={`text-sm p-2 hover:bg-primary hover:text-light
                ${opt === value ? "bg-primary text-light" : null}
                ${!opt.toLowerCase().startsWith(inputValue) ? "hidden" : "block" }
              `}
              onClick={() => {
                setInputvalue("");
                setIsSelectOpened(false);
                onChangeValue(opt);
              }}
            >{opt}</li>
          ))}
        </ul>
      </div>
  )
}

export default CustomSelect;
