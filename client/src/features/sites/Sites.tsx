import SiteCard from "@/features/sites/components/SiteCard";
import { Button } from "@/components/ui";

import useDrawer from "@/hook/useDrawer";

import AddSiteForm from "@/features/sites/components/AddSiteForm";
const Sites = () => {
  const { handleOpenDrawer } = useDrawer();

  const addSite = () => {
    handleOpenDrawer("Add Monitoring Site", AddSiteForm);
  }
  
  return (
    <section>
      <div className="ml-10 xl:ml-0 my-4">
        <Button action={addSite} variant="primary">Add More Sites</Button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 place-items-center xl:place-items-start">
        <SiteCard />
        <SiteCard />
        <SiteCard />
      </div>
      </section>
  )
}

export default Sites;
