import { useState, useEffect } from 'react';
import { useUpdateSiteMutation } from '@/features/sites/api/sitesApi';
import type { ISiteData } from '@/features/sites/api/interface';
import { useToast } from '@/hooks/useToast';

interface IUpdateSite {
  id: string;
  site: ISiteData;
}

const useUpdateSiteForm = ({ id, site }: IUpdateSite) => {
  const [updateSiteData, setUpdateSiteData] = useState<ISiteData>(site);
  const [updateSite, { isLoading }] = useUpdateSiteMutation();
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
    setUpdateSiteData(prev => ({ ...prev, [id]: value }));
  };

  const onChangeSelect = (id: keyof ISiteData, value: string) => {
    setUpdateSiteData(prev => ({ ...prev, [id]: value }));
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
    formData.append(
      'siteData',
      JSON.stringify({
        siteName: updateSiteData.siteName,
        location: updateSiteData.location,
        description: updateSiteData.description,
        sourceType: updateSiteData.sourceType.toUpperCase(),
        imageUrl: updateSiteData.imageUrl || '',
      }),
    );

    if (imgFile) {
      formData.append('sitePhoto', imgFile);
    }
    return formData;
  };

  const callUpdateSite = async () => {
    try {
      const formData = prepareMultiFormData();
      const res = await updateSite({ id, site: formData }).unwrap();
      showToast({
        status: 'success',
        message: res.message,
      });
    } catch (error: any) {
      showToast({
        status: 'error',
        message: error.message || 'Failed to update the site',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callUpdateSite();
  };

  return {
    updateSiteData,
    previewUrl,
    isLoading,
    onChangeInput,
    onChangeSelect,
    handleImageSelect,
    handleSubmit,
  };
};

export default useUpdateSiteForm;
