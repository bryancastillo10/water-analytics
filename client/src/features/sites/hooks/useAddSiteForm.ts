import React, { useState } from "react";
import type { SiteData } from "@/features/sites/api/interface";

const initialSiteData = {
    siteName: "",
    location: "",
    description: "",
    sourceType:"Water Source Type"
}


const useAddSiteForm = () => {
    const [addSiteData, setAddSiteData] = useState<SiteData>(initialSiteData as SiteData);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setAddSiteData({ ...addSiteData, [id]: value });
    };

    const onChangeSelect = (id: keyof SiteData, value: string) => {
        setAddSiteData({ ...addSiteData, [id]: value });
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
          setImgFile(null);        }
    };
    
    const prepareMultiFormData = () => {
        const formData = new FormData();
        formData.append("siteName", addSiteData.siteName);
        formData.append("location", addSiteData.location);
        formData.append("description", addSiteData.description);
        formData.append("sourceType", addSiteData.sourceType);
        if (imgFile) {
          formData.append("image", imgFile);
        }
        return formData;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(addSiteData);
        const formData = prepareMultiFormData();
        console.log(formData);
    };

    return {addSiteData, previewUrl, onChangeInput, handleImageSelect, onChangeSelect, handleSubmit}
}

export default useAddSiteForm;
