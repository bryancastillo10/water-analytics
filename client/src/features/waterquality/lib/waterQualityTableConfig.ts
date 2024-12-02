import { createColumnHelper } from "@tanstack/react-table";
import type { IMeasurementData } from "@/features/waterquality/api/interface";
import { formatDate } from "@/features/waterquality/lib/formatDate";

const columnHelper = createColumnHelper<IMeasurementData>();

export const waterQualityColumns = [
    columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("pH", {
        header: "pH Level",
        cell: (info) => info.getValue()?.toFixed(2),
      }),
      columnHelper.accessor("suspendedSolids", {
        header: "Suspended Solids (mg/L)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("totalCOD", {
        header: "Total COD (mg/L)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("fecalColiform", {
        header: "Fecal Coliform (MPN/100mL)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("temperature", {
        header: "Temperature (°C)",
        cell: (info) => info.getValue()?.toFixed(2),
      }),
      columnHelper.accessor("dissolvedOxygen", {
        header: "Dissolved Oxygen (mg/L)",
        cell: (info) => info.getValue()?.toFixed(2),
      }),
    ]

