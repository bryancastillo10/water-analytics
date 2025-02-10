import {
    ChartLine,
    GridFour,
    MapPin,
    NoteBlank,
    UsersThree,
    type Icon
} from "@phosphor-icons/react";

interface IPagesGuide {
    id: number;
    name: string;
    icon: Icon,
    link: string;
    tagLine: string;
}

export const pagesGuide: IPagesGuide[] = [
    {
        id: 1,
        name: "Dashboard",
        icon: ChartLine,
        link:"/dashboard",
        tagLine: "Summarize Data by Interactive Charts"
    },
    {
        id: 2,
        name: "Data Table",
        icon: GridFour,
        link:"/data-table",
        tagLine:"View Raw Data"
    },
    {
        id: 3,
        name: "Site",
        icon: MapPin,
        link:"/sites",
        tagLine:"Manage Your Monitoring Sites"
    },
    {
        id: 4,
        name: "Sticky Notes",
        icon: NoteBlank,
        link:"/notes",
        tagLine:"Keep Your Ideas Organized"
    },
    {
        id: 5,
        name: "User List",
        icon: UsersThree,
        link:"/users",
        tagLine:"Admin Only: Manage Accounts"
    }
]