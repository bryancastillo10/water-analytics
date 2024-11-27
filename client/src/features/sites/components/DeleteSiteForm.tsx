import { MapPin, Signpost, Drop, Notepad, type Icon } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

import { mockSiteData } from "@/features/sites/api/mockData";
import { formatStringSource } from "@/features/sites/utils/formatWaterSource";

import { ImagePreview } from "@/components/ui";
import { FormButtons } from "@/components/layout";

interface SiteInfoRowProps{
  title: string;
  value: string;
  icon: Icon;
}

interface DeleteSiteFormProps{
  id: string;
}


const SiteInfoRow = ({ title, value, icon: Icon }: SiteInfoRowProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  
  return (
    <div className="grid grid-cols-2 items-center mb-2">
      <h1 className="flex items-center gap-x-2"><Icon size="20" />{title}</h1>
      <p className={`${theme ? "text-secondary":"text-primary"} font-semibold text-pretty`}>{value}</p>
    </div>
  )
};


const DeleteSiteForm = ({ id }: DeleteSiteFormProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  const siteData = mockSiteData.find((data) => data.id === id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("to Delete ID", id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl my-2">Are you sure you want to delete this site?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="col-span-2">
          <SiteInfoRow title="Site Name" icon={Signpost} value={siteData?.siteName!} />
          <SiteInfoRow title="Location" icon={MapPin} value={siteData?.location!} />
          <SiteInfoRow title="Water Source" icon={Drop} value={formatStringSource(siteData?.sourceType!)} />
          <div className="flex flex-col items-start mt-4">
            <h1 className="flex items-center gap-x-2 mb-2"><Notepad size="20" />Description</h1>
            <p className={theme ? "text-secondary":"text-primary"}>{siteData?.description}</p>
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