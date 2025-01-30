import React, { useState } from "react";
import type { ISiteData } from "@/features/sites/api/interface";
import { useCreateSiteMutation } from "@/features/sites/api/sitesApi";
import { useToast } from "@/hooks/useToast";


const initialSiteData = {
    siteName: "",
    location: "",
    description: "",
    sourceType:"Water Source Type"
};


const useAddSiteForm = () => {
    const [addSiteData, setAddSiteData] = useState<ISiteData>(initialSiteData as ISiteData);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [createSite, { isLoading }] = useCreateSiteMutation();
    const { showToast } = useToast();
  
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setAddSiteData((prev) => ({ ...prev, [id]: value}));
    };

    const onChangeSelect = (id: keyof ISiteData, value: string) => {
        setAddSiteData((prev) => ({ ...prev, [id]: value}));
    };

    const handleImageSelect = (file: File | null) => {
        if (file) {
          setImgFile(file);
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setImgFile(null);
          setPreviewUrl(null);
        }
    };
    
    const prepareMultiFormData = () => {
      const formData = new FormData();
      formData.append("siteData", JSON.stringify({
        siteName: addSiteData.siteName,
        location: addSiteData.location,
        description: addSiteData.description,
        sourceType: addSiteData.sourceType.toUpperCase()
      }));
      
      if (imgFile) {
        formData.append("sitePhoto", imgFile)
      }
      return formData;
  
    };
  
    const validateForm = () => {
      const { siteName, location, description, sourceType } = addSiteData;
      if (!siteName || !location || !description || !sourceType) {
        throw new Error("All fields (siteName, location, description, sourceType) are required.");
      }
    };

  
    const callCreateSite = async () => {
      try {
        validateForm();
        const siteForm = prepareMultiFormData();
        const res = await createSite(siteForm).unwrap();
        showToast({
          status: "success",
          message: res.message || "Site created succcessfully"
        });
        }
        catch (error: any) {
          showToast({
              status:"error",
              message: error.message
          })
        } 
    };
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        callCreateSite();
    };

  return {
    addSiteData,
    previewUrl,
    isLoading,
    onChangeInput,
    handleImageSelect,
    onChangeSelect,
    handleSubmit
  }
}

export default useAddSiteForm;
