import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    UpdateUserRequest,
    UpdateUserResponse,
    UpdateProfilePicRequest,
    UpdateProfilePicResponse,
    ResetPwRequest,
    ResetPwResponse,
    VerifyCodeRequest,
    VerifyCodeResponse,
    UpdatePasswordRequest,
    DeleteUserRequest
} from "@/features/user/api/interface";
import type { UserState } from "@/lib/redux/states/userSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "user",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        updateUser: build.mutation<UpdateUserResponse, UpdateUserRequest>({
            query: ({ id, ...data }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: data
            })
        }),
        updateProfilePicture: build.mutation<UpdateProfilePicResponse, UpdateProfilePicRequest>({
            query: ({ userId, file }) => {
              const formData = new FormData();
              formData.append("profilePic", file);      
              return {
                url: `/profile-pic/${userId}`,
                method: "PUT",
                body: formData,
              };
            },
        }),
        getAllUser: build.query < UserState[], {userId: string} > ({
            query: ({ userId }) => ({
                url: `/?id=${encodeURIComponent(userId)}`
           }) 
        }),
        deleteUser: build.mutation<void, DeleteUserRequest>({
            query: ({id, username}) => ({
                url: `/delete/${id}?username=${encodeURIComponent(username)}`,
                method: "DELETE"
            })
        }),
        requestPasswordReset: build.mutation<ResetPwResponse, ResetPwRequest>({
            query: (email) => ({
                url: "/request-reset-password",
                method: "POST",
                body: email
            })
        }),
        verifyCode: build.mutation<VerifyCodeResponse, VerifyCodeRequest>({
            query: (data) => ({
                url: "/verify-code",
                method: "POST",
                body: data
            })
        }),
        updatePassword: build.mutation<ResetPwResponse, UpdatePasswordRequest>({
            query: (data) => ({
                url: "/reset-password",
                method: "PUT",
                body: data
            })
        })
    })
});

export const {
    useUpdateUserMutation,
    useGetAllUserQuery,
    useUpdateProfilePictureMutation,
    useDeleteUserMutation,
    useRequestPasswordResetMutation,
    useVerifyCodeMutation,
    useUpdatePasswordMutation
} = userApi;