import { createColumnHelper } from "@tanstack/react-table";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import type { IBasicParams, IOrgIndicatorParams, INutrientParams } from "@/features/waterquality/tables/interface";

import { formatDate } from "@/features/waterquality/lib/formatDate";

const columnHelper = createColumnHelper<IMeasurementData>();

export const waterQualityColumns = [
    columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => formatDate(info?.getValue()!),
      }),
      columnHelper.accessor("pH", {
        header: "pH Level",
        cell: (info) => info.getValue()?.toFixed(1),
      }),
      columnHelper.accessor("temperature", {
        header: "Temperature (°C)",
        cell: (info) => info.getValue()?.toFixed(1),
      }),
      columnHelper.accessor("dissolvedOxygen", {
        header: "Dissolved Oxygen (mg/L)",
        cell: (info) => info.getValue()?.toFixed(2),
      }),
      columnHelper.accessor("totalCOD", {
        header: "Total COD (mg/L)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("suspendedSolids", {
        header: "Suspended Solids (mg/L)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("fecalColiform", {
        header: "Fecal Coliform (MPN/100mL)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("ammonia", {
        header: () => <>NH<sub>3</sub> as N</>,
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor("nitrates", {
        header: () => <>NO<sub>3</sub><sup>-</sup> as N</>,
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor("phosphates", {
        header: () => <>PO<sub>4</sub><sup>3-</sup> as P</>,
        cell: (info) => info.getValue()
      }),
    ]


const basicParamsColHelper = createColumnHelper<IBasicParams>();

export const viewBasicParamsTable = [
  basicParamsColHelper.accessor("pH", {
    header: "pH Level",
    cell: (row) => row.getValue()
  }),
  basicParamsColHelper.accessor("temperature", {
    header: "Temperature (°C)",
    cell: (row) => row.getValue()
  }),
  basicParamsColHelper.accessor("dissolvedOxygen", {
    header: "Dissolved Oxygen (mg/L)",
    cell: (row) => row.getValue()
  })
];

const orgIndParamsColHelper = createColumnHelper<IOrgIndicatorParams>();

export const viewOrgIndParamsTable = [
  orgIndParamsColHelper.accessor("totalCOD", {
    header: "Total COD (mg/L)",
    cell: (row) => row.getValue()
  }),
  orgIndParamsColHelper.accessor("suspendedSolids", {
    header: "Suspended Solids (mg/L)",
    cell: (row) => row.getValue()
  }),
  orgIndParamsColHelper.accessor("fecalColiform", {
    header: "Fecal Coliform (MPN/100mL)",
    cell: (row) => row.getValue()
  })
];

const nutrientParamsColHelper = createColumnHelper<INutrientParams>();

export const viewNutrientParamsTable = [
  nutrientParamsColHelper.accessor("ammonia", {
    header: () => <>NH<sub>3</sub> as N</>,
    cell: (row) => row.getValue()
  }),
  nutrientParamsColHelper.accessor("nitrates", {
    header: () => <>NO<sub>3</sub><sup>-</sup> as N</>,
    cell: (row) => row.getValue()
  }),
  nutrientParamsColHelper.accessor("phosphates", {
    header: () => <>PO<sub>4</sub><sup>3-</sup> as P</>,
    cell: (row) => row.getValue()
  })
]