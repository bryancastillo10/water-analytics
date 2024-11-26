import AddSiteForm from "@/features/sites/components/AddSiteForm";
import UpdateSiteForm from "@/features/sites/components/UpdateSiteForm";
import DeleteSiteForm from "@/features/sites/components/DeleteSiteForm";

import UpdateUserForm from "@/features/user/components/UpdateUserForm";

export const drawerForms: Record<string, React.ComponentType<any>> = {
    // Site
    AddSiteForm,
    UpdateSiteForm,
    DeleteSiteForm,

    // User
    UpdateUserForm
};