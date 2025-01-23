import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITimeSeries, ITimeSeriesRequest } from "./interface";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "dashboard",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        getTimeSeries: build.query<ITimeSeries, ITimeSeriesRequest>({
            query: ({ id, parameter }) => ({
                url: `/line/site/${id}`,
                body: parameter
            })
        })
    })
});

export const {
    useGetTimeSeriesQuery
} = dashboardApi;