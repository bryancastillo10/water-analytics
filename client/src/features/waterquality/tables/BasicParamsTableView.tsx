import { useReactTable, flexRender } from "@tanstack/react-table";

import { viewBasicParamsTable } from "@/features/waterquality/lib/viewWQTableConfig";
import type { IBasicParams, ParamsTableProps } from "@/features/waterquality/tables/interface";

const BasicParamsTableView = ({paramsData}: Partial<ParamsTableProps<IBasicParams>>) => {

  return (
    <div>
      
    </div>
  )
}

export default BasicParamsTableView;
