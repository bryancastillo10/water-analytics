import { Image,MapPin, Signpost, Drop, Notepad } from "@phosphor-icons/react";
import { FormInput, CustomSelect, UploadImageInput, ImagePreview, FormTextarea, FormButtons } from "@/components/ui";

import { sourceOptions } from "@/features/sites/utils/formatWaterSource";
import useAddSiteForm from "@/features/sites/hooks/useAddSiteForm";

const AddSiteForm = () => {
  const { addSiteData, previewUrl, onChangeInput, onChangeSelect, handleImageSelect, handleSubmit } = useAddSiteForm();


  return (
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
          <FormInput
              id="siteName"
              label="Site Name"
              icon={Signpost}
              value={addSiteData.siteName}
              onChange={onChangeInput}
              validationMessage="Preferred name of the monitoring site"
            />
            <FormInput
              id="location"
              label="Location"
              icon={MapPin}
              value={addSiteData.location}
              onChange={onChangeInput}
              validationMessage="Describe the place (city, country, etc..)"
            />
            <CustomSelect
              label="Water Source Type"
              icon={Drop}
              placeholder="Search for the type"
              value={addSiteData.sourceType}
              options={sourceOptions}
              onChangeValue={(val)=> onChangeSelect("sourceType",val)}
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
              value={addSiteData.description}
              onChange={onChangeInput}
              validationMessage={addSiteData.description.length > 200 ? "Too long!" : "Write a short description about the site"}
            />
            <ImagePreview imageUrl={previewUrl} />
    </div>
    <FormButtons primaryBtnLabel="Add"/>
    </form>
  )
}

export default AddSiteForm;
