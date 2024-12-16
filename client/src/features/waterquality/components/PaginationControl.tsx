import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import {
    CaretDoubleLeft,
    CaretLeft,
    CaretDoubleRight,
    CaretRight,
    CaretDown
} from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";
import type { IMeasurementData } from "@/features/waterquality/api/interface";

interface PaginationControlProps<T> {
    table: Table<T>;
}

interface PageDropDownProps {
    options: number[];
    pageSize: number;
    onChange: React.Dispatch<React.SetStateAction<number>>;
    theme: boolean;
}

const PaginationControl = ({ table }: PaginationControlProps<IMeasurementData>) => {
    const theme = useAppSelector((state) => state.theme.isDarkMode);
    
    const navButtonStyles = `p-1 my-1 mx-1 hover:opacity-80 rounded-xl disabled:cursor-not-allowed 
        ${theme ? "bg-darkGray" : "bg-neutral"}`;
  return (
        <div className="flex justify-end items-center px-2">
        <button
            className={navButtonStyles}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
        >
            <CaretDoubleLeft/>
        </button>
        <button
            className={navButtonStyles}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            <CaretLeft/>
        </button>
        <button
            className={navButtonStyles}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            <CaretRight/>
        </button>
        <button
            className={navButtonStyles}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
        >
            <CaretDoubleRight/>
        </button>
            <PageDropDown
            pageSize={table.getState().pagination.pageSize}
            onChange={(newPageSize) => table.setPageSize(newPageSize)}
            options={[10, 20, 30]}
            theme={theme}
          />
    </div>
  )
}

const PageDropDown =
    ({
        pageSize,
        options,
        onChange,
        theme,
    }: PageDropDownProps) => {
    const [openDropdown, setOpenDropDown] = useState<boolean>(false);
    
    const handleSelection = (opt:number) => {
        onChange(opt);
        setOpenDropDown(false);
    };
    
    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpenDropDown(!openDropdown)}
                className={`${theme ? "bg-darkGray" : "bg-neutral"} 
                flex items-center justify-between rounded-xl px-2 mx-1 cursor-pointer w-full`}
                >
                {pageSize} <CaretDown className={`duration-500 ease-out ${openDropdown ? "-rotate-180":""}`}/>
            </button>
            {openDropdown && (
                <ul
                    className={`absolute mt-1 left-3 rounded-lg shadow-md z-10
                            ${theme ? "bg-darkGray" : "bg-neutral"} 
                    `}
                    onMouseLeave={() => setOpenDropDown(false)}
                >
                    {options.map((opt) => (
                        <li
                            className={`w-full px-3 py-2 cursor-pointer rounded-md hover:bg-primary hover:text-light
                            ${pageSize === opt? "bg-primary text-light" : ""}
                            `}
                            key={opt}
                            onClick={() => handleSelection(opt)}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default PaginationControl;
