import SiteCard from "@/features/sites/components/SiteCard";
import { Button } from "@/components/ui";

const Sites = () => {
  return (
    <section>
      <div className="ml-10 xl:ml-0 my-4">
        <Button variant="primary">Add More Sites</Button>
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
