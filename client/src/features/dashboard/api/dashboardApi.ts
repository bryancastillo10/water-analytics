import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ISitePercentage, ITimeSeries, ITimeSeriesRequest } from "./interface";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "dashboard",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        getTimeSeries: build.query<ITimeSeries, ITimeSeriesRequest>({
            query: ({ id, parameter, startDate, endDate }) => ({
                url: `/line/site/${id}`,
                params: {
                    parameter,
                    startDate,
                    endDate
                }
            })
        }),
        getSitePercentage: build.query<ISitePercentage, void>({
            query: () => ({
                url: "/pie"
            })
        }) 
    })
});

export const {
    useGetTimeSeriesQuery
} = dashboardApi;