import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

interface SelectProps{
    options: string[];
    onChangeValue: (selection: string) => void;
    width?: string;
    placeholder?: string;
    label?: string;
}

const CustomSelect = ({
    options,
    onChangeValue,
    width = "w-full",
    label = "Select Options",
    placeholder = "Search for Options"  
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
          <div className="flex justify-between items-center w-full px-3 border-transparent focus:border-primary">
              <p>{selectedOption ?? label}</p>
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
                ${opt === selectedOption ? "bg-primary text-light" : null}
                ${!opt.toLowerCase().startsWith(inputValue) ? "hidden" : "block" }
              `}
              onClick={() => {
                setSelectedOption(opt);
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