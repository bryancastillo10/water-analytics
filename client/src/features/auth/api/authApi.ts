import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    SignInData,
    SignInResponse,
    SignUpData,
    SignUpResponse
} from "@/features/auth/api/interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "auth",
    credentials:'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } })?.auth?.token;
      if (token) {
        headers.set(`Authorization`, `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUpData>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    signIn: build.mutation<SignInResponse, SignInData>({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
    }),
      signOut: build.mutation<{ message: string }, void>({
          query: () => ({
            url: "/signout",
            method: "POST",  
          }),
    })
  }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation
} = authApi;