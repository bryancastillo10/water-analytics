import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { CloudinaryError } from '@/infrastructure/errors/customErrors';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Utility function to upload an image to Cloudinary.
 *
 * @param filePath - The local file path of the image to upload.
 * @param folder - (Optional) The folder in Cloudinary where the image will be stored.
 * @returns The secure URL of the uploaded image.
 * @throws Error if the upload fails.
 */

interface uploadImageProps {
  filePath: string;
  folder: string;
  deleteLocalFile: boolean;
}

export const uploadImage = async ({
  filePath,
  folder = 'sites',
  deleteLocalFile = true,
}: uploadImageProps): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder || 'default',
      transformation: [
        {
          width: 1200,
          height: 1200,
          crop: 'fill',
          gravity: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
      ],
    });

    if (deleteLocalFile) {
      fs.unlink(filePath, error => {
        if (error) console.error('Error deleting the local file:', error);
      });
    }

    return result.secure_url;
  } catch (error) {
    throw new CloudinaryError('Failed to upload image to Cloudinary');
  }
};


export const getPublicId = (url: string): string => {
  const urlParts = url.split('/');
  const filenameWithExt = urlParts[urlParts.length - 1].split('.')[0];
  return filenameWithExt;
};

export const deleteImage = async (publicId: string) => {
  try{
    return await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',     
    });
  } catch(error){
    throw new CloudinaryError('Failed to delete image from Cloudinary');
  }
};
