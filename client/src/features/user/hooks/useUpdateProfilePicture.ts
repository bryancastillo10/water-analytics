import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setProfilePic } from "@/lib/redux/states/userSlice";

import { useToast } from "@/hook/useToast";
import { useUpdateProfilePictureMutation } from "@/features/user/api/userApi";

const useUpdateProfilePicture = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.profilePic);
  
    const [updateProfilePicture, { isLoading }] = useUpdateProfilePictureMutation();
    const { showToast } = useToast();
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
            setPreviewUrl(user.profilePic);
          }
      };
    
    const callUpdateProfilePic = async () => {
      try {
        if (imgFile && user.user_id) {
          const res = await updateProfilePicture({ userId: user.user_id, file: imgFile }).unwrap();
          
          dispatch(setProfilePic(res.profilePic));
          setPreviewUrl(res.profilePic);
          showToast({
            status: "success",
            message: res.message
          });
  
        }
      } catch (error:any) {
          showToast({
            status: "error",
            message: error?.data?.message || "Failed to upload and update profile picture"
          });
        }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callUpdateProfilePic();
    };

    return {
        previewUrl,
        isLoading,
        handleImageSelect,
        handleSubmit
    }
}

export default useUpdateProfilePicture;
