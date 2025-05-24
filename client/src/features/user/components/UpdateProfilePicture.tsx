import { UploadImageInput, ImagePreview } from '@/components/ui';
import { ImageSquare } from '@phosphor-icons/react';
import { FormButtons } from '@/components/layout';

import useUpdateProfilePicture from '@/features/user/hooks/useUpdateProfilePicture';

const UpdateProfilePicture = () => {
  const { previewUrl, isLoading, handleImageSelect, handleSubmit } = useUpdateProfilePicture();

  return (
    <form onSubmit={handleSubmit}>
      <UploadImageInput
        label="Upload photo here"
        icon={ImageSquare}
        onImageSelect={handleImageSelect}
      />
      <ImagePreview imageUrl={previewUrl} />
      <FormButtons loading={isLoading} primaryBtnLabel="Save" />
    </form>
  );
};

export default UpdateProfilePicture;
