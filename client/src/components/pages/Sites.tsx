import SiteCard from "@/features/sites/components/SiteCard";
// import { mockSiteData } from "@/features/sites/api/mockData";
import { useGetSiteByUserQuery } from "@/features/sites/api/sitesApi";

import { Button } from "@/components/ui";

import useDrawer from "@/hook/useDrawer";
import { LoadingAnimation } from "@/components/common";
import { FailedRequest } from "@/assets/svg";

const Sites = () => {
  const { handleOpenDrawer } = useDrawer();
  const { data: getSitesData, isLoading, error } = useGetSiteByUserQuery();

  const addSite = () => {
    handleOpenDrawer("Add Monitoring Site", "AddSiteForm");
  };

  if (isLoading) {
    return (
      <section className="flex w-full h-full justify-center items-center">
        <LoadingAnimation size="lg"/>
      </section>
    )
  };

  if (error) {
    return (
      <section className="flex flex-col w-full h-full justify-center items-center">
        <FailedRequest fill="#006DA3" />
        <h1 className="mt-4 text-lg">Sorry 🥹 Failed to fetch the data</h1>
        <p className="text-darkGray">Try to refresh the page</p>
      </section>
    )
  };

  return (
    <section>
      <div className="ml-10 xl:ml-0 my-4">
        <Button action={addSite} variant="primary">Add More Sites</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center xl:place-items-start">
        {getSitesData && getSitesData.map((site) => (
          <SiteCard key={site.id} siteData={site} />
        ))}
      </div>
      </section>
  )
}

export default Sites;
