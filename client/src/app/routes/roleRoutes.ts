
import { DashboardPage, DataTablePage, Sites, NotesPage, Settings } from "@/components/pages";

export const roleRoutes = {
    admin: [
        { path: "dashboard", element: DashboardPage as React.ComponentType },
        { path: "data-table", element: DataTablePage as React.ComponentType },
        { path: "sites", element: Sites as React.ComponentType },
        { path: "notes", element: NotesPage as React.ComponentType },
        { path: "settings", element: Settings as React.ComponentType },
    ],
    public: [
        { path: "dashboard", element: DashboardPage as React.ComponentType },
        { path: "data-table", element: DataTablePage as React.ComponentType },
        { path: "sites", element: Sites as React.ComponentType },
        { path: "notes", element: NotesPage as React.ComponentType },
        { path: "settings", element: Settings as React.ComponentType },
    ],
    analyst: [
        { path: "dashboard", element: DashboardPage as React.ComponentType },
        { path: "data-table", element: DataTablePage as React.ComponentType },
        { path: "sites", element: Sites as React.ComponentType },
        { path: "notes", element: NotesPage as React.ComponentType },
        { path: "settings", element: Settings as React.ComponentType },
    ],
};