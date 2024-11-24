import { useState } from "react";
import { FormInput, CustomSelect, UploadImageInput, ImagePreview } from "@/components/ui"
import { WaterSourceType } from "@/features/sites/api/interface";
import { formatEnumWaterSource } from "../utils/formatWaterSource";




const AddSiteForm = () => {
  const SourceOptions = formatEnumWaterSource(Object.values(WaterSourceType));

  // const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (file: File | null) => {
    // setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="grid grid-cols-2 items-center gap-x-4">
          <FormInput
              id="siteName"
              label="Site Name"
              value={""}
              onChange={()=>{}}
              validationMessage="Preferred name of the monitoring site"
            />
            <FormInput
              id="location"
              label="Location"
              value={""}
              onChange={()=>{}}
              validationMessage="Describe the place (city, country, etc..)"
            />
            <CustomSelect
              options={SourceOptions}
              onChangeValue={(selected) => console.log(selected)}
            />
            <UploadImageInput
              label="Site Photo"
              onImageSelect={handleImageSelect}
            />
            <ImagePreview imageUrl={previewUrl} />
    </div>
  )
}

export default AddSiteForm;
