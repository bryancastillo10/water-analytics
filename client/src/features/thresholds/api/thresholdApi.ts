import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UpdateThresholdRequest, IThresholdData, UpdateThresholdResponse } from "@/features/thresholds/api/interface";

export const thresholdApi = createApi({
    reducerPath: "threshold",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "threshold",
        credentials: 'include'
    }),
    tagTypes:["getThreshold"],
    endpoints: (build) => ({
        getThreshold: build.query<IThresholdData[], { id: string }>({
            query: ({ id }) => ({
                url: `/get?id=${encodeURIComponent(id)}`
            }),
           providesTags: ["getThreshold"]
        }),
        updateThreshold: build.mutation<UpdateThresholdResponse, UpdateThresholdRequest[]>({
            query: (data) => ({
                url: "/update",
                method: "PUT",
                body: data
            }),
            invalidatesTags:["getThreshold"]
        })
    })
});

export const {
    useGetThresholdQuery,
    useUpdateThresholdMutation
} = thresholdApi;