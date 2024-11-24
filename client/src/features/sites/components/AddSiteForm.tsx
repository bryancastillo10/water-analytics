import { useAppDispatch } from "@/lib/redux/hooks";
import { closeDrawer } from "@/lib/redux/states/drawerSlice";

import { useState } from "react";
import { Image,MapPin, Signpost, Drop, Notepad } from "@phosphor-icons/react";
import { FormInput, CustomSelect, UploadImageInput, ImagePreview, FormTextarea, Button } from "@/components/ui"
import { WaterSourceType } from "@/features/sites/api/interface";
import { formatEnumWaterSource } from "../utils/formatWaterSource";



const AddSiteForm = () => {
  const SourceOptions = formatEnumWaterSource(Object.values(WaterSourceType));
  const dispatch = useAppDispatch();

  // const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [description, setDescription] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

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

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  }

  return (
    <form>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4">
          <FormInput
              id="siteName"
              label="Site Name"
              icon={Signpost}
              value={""}
              onChange={()=>{}}
              validationMessage="Preferred name of the monitoring site"
            />
            <FormInput
              id="location"
              label="Location"
              icon={MapPin}
              value={""}
              onChange={()=>{}}
              validationMessage="Describe the place (city, country, etc..)"
            />
            <CustomSelect
              label="Water Source Type"
              icon={Drop}
              placeholder="Search for the type"
              options={SourceOptions}
              onChangeValue={(selected) => console.log(selected)}
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
              value={description}
              onChange={handleTextareaChange}
              validationMessage={description.length > 200 ? "Too long!" : "Write a short description about the site"}
            />
            <ImagePreview imageUrl={previewUrl} />
    </div>
          <div className="mt-4 w-full flex justify-evenly gap-4">
              <Button action={handleCloseDrawer} width="w-full" variant="outline">Cancel</Button>
              <Button width="w-full" variant="primary">Add</Button>
          </div>
    </form>
  )
}

export default AddSiteForm;
