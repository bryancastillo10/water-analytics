import { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel , type SortingState} from "@tanstack/react-table";

import useDrawer from "@/hook/useDrawer";
import { useAppSelector } from "@/lib/redux/hooks";

import { waterQualityColumns } from "@/features/waterquality/lib/viewWQTableConfig";
import type { IMeasurementData } from "@/features/waterquality/api/interface";

const useWaterQualityTable = ({data}: {data:IMeasurementData[]}) => {   
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    
    const { handleOpenDrawer } = useDrawer();
    const theme = useAppSelector((state) => state.theme.isDarkMode);
  
    const updateMeasurementDrawer = (id:string) => {
      handleOpenDrawer("Edit your Water Quality Data", "UpdateMeasurementData", {id , data})
    };
  
    const deleteMeasurementDrawer = (id:string) => {
      handleOpenDrawer("Delete this Water Quality Data", "DeleteMeasurementData", {id, data})
    };

    const addMeasurementDrawer = (siteName: string) => {
        handleOpenDrawer("Add Water Quality Data to " + siteName, "AddMeasurementData");
    };
  
    const waterTable = useReactTable({
      data,
      columns: waterQualityColumns,
      debugTable:true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10
        }
      },
    });


    return {
        theme,
        waterTable,
        addMeasurementDrawer,
        updateMeasurementDrawer,
        deleteMeasurementDrawer,
        hoveredRow,
        setHoveredRow
    }
}

export default useWaterQualityTable;
