
import { DashboardPage, DataTablePage, Sites, NotesPage, UsersList, Settings } from "@/components/pages";
import type React from "react";

export const appRoutes = [
        { path: "dashboard", element: DashboardPage as React.ComponentType },
        { path: "data-table", element: DataTablePage as React.ComponentType },
        { path: "sites", element: Sites as React.ComponentType },
        { path: "notes", element: NotesPage as React.ComponentType },
        { path: "settings", element: Settings as React.ComponentType },
        { path: "users", element: UsersList as React.ComponentType }

];