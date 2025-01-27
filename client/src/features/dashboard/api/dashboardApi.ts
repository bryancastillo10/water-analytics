import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ISitePercentage, ITimeSeries, ITimeSeriesRequest } from "./interface";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "dashboard",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        getParameterFilters: build.query<string[], void>({
            query: () => ({
               url:"/filter/parameter"
           })
        }),
        getDateFilters: build.query<string[], {siteId: string} > ({
            query: (siteId) => ({   
                url: `filter/date/${siteId}`
            })
        }),
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
    useGetParameterFiltersQuery,
    useGetTimeSeriesQuery,
    useGetSitePercentageQuery
} = dashboardApi;