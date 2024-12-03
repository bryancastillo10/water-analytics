import { createColumnHelper } from "@tanstack/react-table";
import { FormNumberInput } from "@/components/ui";
import type { IMeasurementData } from "@/features/waterquality/api/interface";


const columnHelper = createColumnHelper<IMeasurementData>();

export const basicParamColumnsConfig = () => [
    columnHelper.accessor("pH", {
        header: "pH Level",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={7}
                onChange={()=>{}}
            />
            )
        },
    }),
    columnHelper.accessor("temperature", {
        header: "Temperature (°C)",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={20}
                onChange={()=>{}}
            />
            )
        },
    }),
    columnHelper.accessor("dissolvedOxygen", {
        header: "Dissolved Oxygen (mg/L)",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={0.1}
                onChange={()=>{}}
            />
            )
        },
    })
];


export const orgIndicatorColumnsConfig = () => [
    columnHelper.accessor("totalCOD", {
        header: "Total COD (mg/L)",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={200}
                onChange={()=>{}}
            />
            )
        },
    }),
    columnHelper.accessor("suspendedSolids", {
        header: "Suspended Solids (mg/L)",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={150}
                onChange={()=>{}}
            />
            )
        },
    }),
    columnHelper.accessor("fecalColiform", {
        header: "Fecal Coliform (MPN/100mL)",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={50}
                onChange={()=>{}}
            />
            )
        },
    })
];

export const nutrientParamsColumnsConfig = () => [
    columnHelper.accessor("ammonia", {
        header: () => <>NH<sub>3</sub> as N</>,
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={0.1}
                onChange={()=>{}}
            />
            )
        },
    }),
    columnHelper.accessor("nitrates", {
        header: () => <>NO<sub>3</sub><sup>-</sup> as N</>,
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={0.25}
                onChange={()=>{}}
            />
            )
        },
    }),
    columnHelper.accessor("phosphates", {
        header: () => <>PO<sub>4</sub><sup>3-</sup> as P</>,
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <FormNumberInput
                id={id}
                value={0.75}
                onChange={()=>{}}
            />
            )
        },
    }),
];