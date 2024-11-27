import React, { useState, useEffect } from "react";
import type { SiteData } from "@/features/sites/api/interface";



const useUpdateSiteForm = (initialSiteData: SiteData) => {
    const [updateSiteData, setUpdateSiteData] = useState<SiteData>(initialSiteData);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialSiteData.imageURL);

    useEffect(() => {
        setUpdateSiteData(initialSiteData);
        setPreviewUrl(initialSiteData.imageURL || null);
    }, [initialSiteData]);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setUpdateSiteData({ ...updateSiteData, [id]: value });
    };

    const onChangeSelect = (id: keyof SiteData, value: string) => {
        setUpdateSiteData({ ...updateSiteData, [id]: value });  
    };

    const handleImageSelect = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setImgFile(file);
        } else {
            setImgFile(null);
            setPreviewUrl(null);
        }
    };

    const prepareMultiFormData = () => {
        const formData = new FormData();
        formData.append("siteName", updateSiteData.siteName);
        formData.append("location", updateSiteData.location);
        formData.append("description", updateSiteData.description);
        formData.append("sourceType", updateSiteData.sourceType);
        if (imgFile) {
          formData.append("image", imgFile);
        }
        return formData;
      };
      
    const handleSubmit = (e: React.FormEvent) => {
        console.log(updateSiteData);
        e.preventDefault();
        const formData = prepareMultiFormData();
        console.log(formData);
    }

    return { updateSiteData, previewUrl, onChangeInput, onChangeSelect, handleImageSelect, handleSubmit };
}

export default useUpdateSiteForm;
