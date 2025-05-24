import { ImageSquare } from '@phosphor-icons/react';
interface ImagePreviewProps {
  imageUrl: string | null;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  return (
    <div
      className="mt-4 w-full min-w-fit h-40 flex items-center justify-center
     border border-dashed border-neutral rounded-md bg-secondary/10"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="uploaded-img-preview"
          className="h-full w-auto object-contain rounded-md"
        />
      ) : (
        <div className="grid grid-cols-1 place-items-center">
          <span className="flex">
            <ImageSquare size="20" /> ...
          </span>
          <span className="text-darkGray">No Image was uploaded</span>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
