import AddSiteForm from "@/features/sites/components/AddSiteForm";
import UpdateSiteForm from "@/features/sites/components/UpdateSiteForm";
import DeleteSiteForm from "@/features/sites/components/DeleteSiteForm";

export const siteFormsMap: Record<string, React.ComponentType<any>> = {
    AddSiteForm,
    UpdateSiteForm,
    DeleteSiteForm
};