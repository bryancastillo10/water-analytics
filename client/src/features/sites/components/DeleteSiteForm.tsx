import { ImagePreview, FormButtons } from "@/components/ui";
import { MapPin, Signpost, Drop, Notepad, type Icon } from "@phosphor-icons/react";
import { mockSiteData } from "@/features/sites/api/mockData";
import { formatStringSource } from "@/features/sites/utils/formatWaterSource";

interface SiteInfoRowProps{
  title: string;
  value: string;
  icon: Icon;
}

interface DeleteSiteFormProps{
  id: string;
}


const SiteInfoRow = ({title, value ,icon:Icon}: SiteInfoRowProps) => {
  return (
    <div className="grid grid-cols-2 items-center mb-2">
      <h1 className="flex items-center gap-x-2"><Icon size="20" />{title}</h1>
      <p className="text-primary font-semibold text-pretty">{value}</p>
    </div>
  )
};


const DeleteSiteForm = ({ id }: DeleteSiteFormProps) => {
  const siteData = mockSiteData.find((data) => data.id === id);

  return (
    <form>
      <h1 className="text-xl my-2">Are you sure you want to delete this site?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="col-span-2">
          <SiteInfoRow title="Site Name" icon={Signpost} value={siteData?.siteName!} />
          <SiteInfoRow title="Location" icon={MapPin} value={siteData?.location!} />
          <SiteInfoRow title="Water Source" icon={Drop} value={formatStringSource(siteData?.sourceType!)} />
          <div className="flex flex-col items-start mt-4">
            <h1 className="flex items-center gap-x-2 mb-2"><Notepad size="20" />Description</h1>
            <p className="text-primary">{siteData?.description}</p>
        </div>
        </div>     
        <div className="col-span-1">
          <ImagePreview imageUrl={siteData?.imageURL!}/>
        </div>
      </div>
      <FormButtons primaryBtnLabel="Delete"/>
    </form>
  )
}

export default DeleteSiteForm;


{/* <div className="flex items-center gap-4">
          <h1>Site Name:</h1>
          <p className="text-primary font-semibold">{siteData?.siteName}</p>
        </div>
        <div className="flex items-center gap-4">
          <h1>Location:</h1>
          <p className="text-primary font-semibold">{siteData?.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <h1>Water Source Type:</h1>
          <p className="text-primary font-semibold">{siteData?.sourceType}</p>
        </div>
        <div className="flex flex-col place-items-start w-[50%] gap-4">
          <h1>Description:</h1>
          <p className="text-primary font-semibold">{siteData?.description}</p>
        </div> */}