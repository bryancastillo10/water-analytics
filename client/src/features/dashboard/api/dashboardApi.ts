import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    IDashboardCardResponse,
    INutrientStatsResponse,
    ISitePercentage,
    ITimeSeries,
    ITimeSeriesRequest,
    ISiteStatRequest,
    ISiteStatResponse,
    IParamStatisticsResponse,
    IParamStatisticsRequest
} from "@/features/dashboard/api/interface";
import { TagType } from "@/lib/mappings/tagTypes";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "dashboard",
        credentials: 'include'
    }),
    tagTypes:[TagType.DASHBOARD],
    endpoints: (build) => ({
        getParameterFilters: build.query<string[], void>({
            query: () => ({
                url: "/filter/parameter"
            }),
            providesTags: [TagType.DASHBOARD],
        }),
        getDateFilters: build.query<string[], string>({
            query: (siteId) => ({
                url: `filter/date/${siteId}`
            }),
            providesTags: [TagType.DASHBOARD],
        }),
        getTimeSeries: build.query<ITimeSeries[], ITimeSeriesRequest>({
            query: ({ id, parameter, startDate, endDate }) => ({
                url: `/line/site/${id}`,
                params: {
                    parameter,
                    startDate,
                    endDate
                }
            }),
            providesTags: [TagType.DASHBOARD],
        }),
        getSitePercentage: build.query<ISitePercentage, void>({
            query: () => ({
                url: "/pie"
            }),
            providesTags: [TagType.DASHBOARD],
        }),
        getDashboardCardValues: build.query<IDashboardCardResponse[], string>({
            query: (siteId) => ({
                url: `/card/site/${siteId}`
            }),
            providesTags: [TagType.DASHBOARD],
        }),
        getNutrientStats: build.query<INutrientStatsResponse, string>({
            query: (siteId) => ({
                url:`/bar/site/${siteId}`
            }),
            providesTags: [TagType.DASHBOARD]
        }),
        getParameterProfileStatistics: build.query<IParamStatisticsResponse, IParamStatisticsRequest>({
            query: ({siteId, paramgroup}) => ({
                url: `/site/${siteId}?paramgroup=${paramgroup}`
            })
        }),
        getSiteStatSummary: build.query<ISiteStatResponse<number>, ISiteStatRequest>({
            query: ({siteId, statType}) => ({
                url: `/radar/site/${siteId}?statType=${statType}`
            }),
            providesTags: [TagType.DASHBOARD]
        }) 
    })
});

export const {
    useGetParameterFiltersQuery,
    useGetDateFiltersQuery,
    useGetTimeSeriesQuery,
    useGetSitePercentageQuery,
    useGetDashboardCardValuesQuery,
    useGetNutrientStatsQuery,
    useGetSiteStatSummaryQuery,
    useGetParameterProfileStatisticsQuery
} = dashboardApi;