import { useState } from "react";
import { mockSiteData } from "@/features/sites/api/mockData";
import { Image, MapPin, Signpost, Drop, Notepad } from "@phosphor-icons/react";

import { FormInput, CustomSelect, UploadImageInput, FormTextarea, ImagePreview, FormButtons } from "@/components/ui";
import { sourceOptions, formatStringSource } from "@/features/sites/utils/formatWaterSource";

interface UpdateSiteFormProps{
  id: string;
}

const UpdateSiteForm = ({ id }: UpdateSiteFormProps) => {
  const siteData = mockSiteData.find((data) => data.id === id);
  const [previewUrl, setPreviewUrl] = useState<string | null>(siteData?.imageURL!);
  
  const handleImageSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };


  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
        <FormInput
          id="siteName"
          label="Site Name"
          icon={Signpost}
          value={siteData?.siteName!}
          onChange={() => { }}
          validationMessage="Preferred name of the monitoring site"
        />
        <FormInput
          id="location"
          label="Location"
          icon={MapPin}
          value={siteData?.location!}
          onChange={()=>{}}
          validationMessage="Describe the place (city, country, etc..)"
        />
        <CustomSelect
              label="Water Source Type"
              value={formatStringSource(siteData?.sourceType!)}
              icon={Drop}
              placeholder="Search for the type"
              options={sourceOptions}
              onChangeValue={() => console.log()}
        />
        <UploadImageInput
              label="Site Photo"
              icon={Image}
              onImageSelect={handleImageSelect}
        />
        <FormTextarea
            id="description"
            label="Description"
            icon={Notepad}
            value={siteData?.description!}
            onChange={(selectedSourceTypeValue)=>{console.log(selectedSourceTypeValue)}}
            validationMessage={siteData?.description.length! > 200 ? "Too long!" : "Write a short description about the site"}
        />
        <ImagePreview imageUrl={previewUrl} />
      </div>
      <FormButtons primaryBtnLabel="Update"/>
    </form>
  )
}

export default UpdateSiteForm;
