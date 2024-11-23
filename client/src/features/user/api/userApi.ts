import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    UserProfile,
    UpdateUserRequest,
    ResetPwRequest,
    ResetPwResponse,
    VerifyCodeRequest,
    VerifyCodeResponse,
    UpdatePasswordRequest
} from "@/features/user/api/interface";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials:'include'
    }),
    endpoints: (build) => ({
        updateUser: build.mutation<UserProfile, UpdateUserRequest>({
            query: ({id,...data}) => ({
                url: `user/update/${id}`,
                method: "PUT",
                body:data
            })
        }),
        deleteUser: build.mutation<{ id: string }, void>({
            query: (id) => ({
                url: `user/delete/${id}`,
                method: "DELETE",
            })
        }),
        requestPasswordReset: build.mutation<ResetPwResponse, ResetPwRequest>({
            query: ({ email }) => ({
                url: "user/request-reset-password",
                method: "POST",
                body: email
            })
        }),
        verifyCode: build.mutation<VerifyCodeResponse, VerifyCodeRequest>({
            query: (data) => ({
                url: "user/verify-code",
                method: "POST",
                body: data
            })
        }),
        updatePassword: build.mutation<ResetPwResponse, UpdatePasswordRequest>({
            query: (data) => ({
                url: "user/reset-password",
                method: "PUT",
                body: data
            }) 
        })
    })
})