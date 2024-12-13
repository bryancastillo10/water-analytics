import { useState, useEffect } from "react";
import { useUpdateSiteMutation } from "@/features/sites/api/sitesApi";
import type { ISiteData } from "@/features/sites/api/interface";

import { useToast } from "@/hook/useToast";

interface IUpdateSite{
    id: string;
    site: ISiteData;
}

const useUpdateSiteForm = ({id, site}: IUpdateSite) => {
    const [updateSiteData, setUpdateSiteData] = useState<ISiteData>(site);
    const [updateSite, {isLoading}] = useUpdateSiteMutation();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(site.imageUrl);

    const { showToast } = useToast();

    useEffect(() => {
        if (site) {
            setUpdateSiteData(site);
            setPreviewUrl(site.imageUrl || null);
        } 
    }, [site]);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setUpdateSiteData({ ...updateSiteData, [id]: value });
    };

    const onChangeSelect = (id: keyof ISiteData, value: string) => {
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
            formData.append("sitePhoto", imgFile);
        } else if (updateSiteData.imageUrl) {
            formData.append("imageUrl", updateSiteData.imageUrl)
        }
        return formData;
    };
    

    const callUpdateSite = async () => {
        try {
          const formData = prepareMultiFormData();
          const res = await updateSite({id, site: formData}).unwrap();
          console.log(res);
          
          showToast({
            status: "success",
            message: res.message
          });
            
      } catch (error:any) {
            showToast({
                status: "error",
                message:""
          })
      } 
    };
      
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        callUpdateSite();
    }

    return {
        updateSiteData,
        previewUrl,
        isLoading,
        onChangeInput,
        onChangeSelect,
        handleImageSelect,
        handleSubmit
    };
}

export default useUpdateSiteForm;
