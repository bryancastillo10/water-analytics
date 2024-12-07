import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    UserProfile,
    UpdateUserRequest,
    ResetPwRequest,
    ResetPwResponse,
    VerifyCodeRequest,
    VerifyCodeResponse,
    UpdatePasswordRequest,
    DeleteUserRequest
} from "@/features/user/api/interface";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "user",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        updateUser: build.mutation<UserProfile, UpdateUserRequest>({
            query: ({ id, ...data }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: data
            })
        }),
        deleteUser: build.mutation<void, DeleteUserRequest>({
            query: ({id, username}) => ({
                url: `/delete/${id}`,
                method: "DELETE",
                body: username
            })
        }),
        requestPasswordReset: build.mutation<ResetPwResponse, ResetPwRequest>({
            query: ({ email }) => ({
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
    useDeleteUserMutation,
    useRequestPasswordResetMutation,
    useVerifyCodeMutation,
    useUpdatePasswordMutation
} = userApi;