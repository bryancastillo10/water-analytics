import { useState } from "react";
import { UploadImageInput, ImagePreview } from "@/components/ui";
import { ImageSquare } from "@phosphor-icons/react";
import { FormButtons } from "@/components/layout";

const UpdateProfilePicture = () => {
    // const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageSelect = (file: File | null) => {
        if (file) {
        //   setImgFile(file);
            const reader = new FileReader();
          reader.onload = () => {
            // setUserData((prevData) => ({ ...prevData, imageURL: reader.result as string }));
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
        //   setImgFile(null);
        //   setUserData((prevData) => ({ ...prevData, imageURL: "" }));
        }
    };
  return (
    <form>
        <UploadImageInput
              label="Upload photo here"
              icon={ImageSquare}
              onImageSelect={handleImageSelect}
          />
          <ImagePreview imageUrl={previewUrl} />
          <FormButtons primaryBtnLabel="Save"/>
    </form>
  )
}

export default UpdateProfilePicture;
