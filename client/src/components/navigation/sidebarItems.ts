import {
    ChartLine,
    GridFour,
    MapPin,
    Gear,
    type Icon
} from "@phosphor-icons/react";

interface sidebarItemsProps {
    id: number;
    name: string;
    icon: Icon;
    link: string;
}
export const sidebarItems: sidebarItemsProps[] = [
    {
        id: 1,
        name: "Dashboard",
        icon: ChartLine,
        link:"/dashboard"
    },
    {
        id: 2,
        name: "Data Table",
        icon: GridFour,
        link:"/data-table"
    },
    {
        id: 3,
        name: "Sites",
        icon: MapPin,
        link:"/sites"
    },
    {
        id: 4,
        name: "Settings",
        icon: Gear,
        link:"/settings"
    }
]