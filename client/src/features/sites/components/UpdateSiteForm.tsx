import { Image, MapPin, Signpost, Drop, Notepad } from "@phosphor-icons/react";

import useUpdateSiteForm from "@/features/sites/hooks/useUpdateSiteForm";


import { sourceOptions, formatStringSource } from "@/features/sites/utils/formatWaterSource";
import type { ISiteData } from "@/features/sites/api/interface";
import { FormInput, CustomSelect, UploadImageInput, FormTextarea, ImagePreview } from "@/components/ui";
import { DrawerFetchError, DrawerLoadingState, FormButtons } from "@/components/layout";

interface UpdateSiteFormProps{
  id: string;
  siteData: ISiteData;
}

const UpdateSiteForm = ({ id, siteData }: UpdateSiteFormProps) => {
  
  if (!siteData) {
    return <DrawerFetchError/>
  };

  const { updateSiteData,
          previewUrl, 
          isLoading,
          onChangeInput, 
          onChangeSelect, 
          handleImageSelect, 
          handleSubmit 
        } = useUpdateSiteForm({ id, site: siteData });


  return (
    <form onSubmit={handleSubmit}>
      {!isLoading ? <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
        <FormInput
          id="siteName"
          label="Site Name"
          icon={Signpost}
          value={updateSiteData?.siteName}
          onChange={onChangeInput}
          validationMessage="Preferred name of the monitoring site"
        />
        <FormInput
          id="location"
          label="Location"
          icon={MapPin}
          value={updateSiteData?.location}
          onChange={onChangeInput}
          validationMessage="Describe the place (city, country, etc..)"
        />
        <CustomSelect
              label="Water Source Type"
              value={formatStringSource(updateSiteData?.sourceType)}
              icon={Drop}
              placeholder="Search for the type"
              options={sourceOptions}
              onChangeValue={(val) => onChangeSelect("sourceType", val)}
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
            value={updateSiteData?.description}
            onChange={onChangeInput}
            validationMessage={siteData?.description.length! > 200 ? "Too long!" : "Write a short description about the site"}
        />
        <ImagePreview imageUrl={previewUrl} /> 
      </div> :
          <DrawerLoadingState/>
        }
      <FormButtons loading={isLoading} primaryBtnLabel="Update"/>
    </form>
  )
}

export default UpdateSiteForm;
