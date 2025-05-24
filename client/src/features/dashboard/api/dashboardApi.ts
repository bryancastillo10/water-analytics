import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IDashboardCardResponse,
  ISitePercentage,
  ITimeSeries,
  ITimeSeriesRequest,
  ISiteStatRequest,
  ISiteStatResponse,
  IParamStatisticsResponse,
  IParamStatisticsRequest,
} from '@/features/dashboard/api/interface';
import { TagType } from '@/lib/mappings/tagTypes';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + 'dashboard',
    credentials: 'include',
  }),
  tagTypes: [TagType.DASHBOARD],
  endpoints: build => ({
    // Filters
    getParameterFilters: build.query<string[], void>({
      query: () => ({
        url: '/filter/parameter',
      }),
      providesTags: [TagType.DASHBOARD],
    }),
    getDateFilters: build.query<string[], string>({
      query: siteId => ({
        url: `filter/date/${siteId}`,
      }),
      providesTags: [TagType.DASHBOARD],
    }),

    // Line Chart
    getTimeSeries: build.query<ITimeSeries[], ITimeSeriesRequest>({
      query: ({ id, parameter, startDate, endDate }) => ({
        url: `/line/site/${id}`,
        params: {
          parameter,
          startDate,
          endDate,
        },
      }),
      providesTags: [TagType.DASHBOARD],
    }),

    // Dashboard KPI Card
    getDashboardCardValues: build.query<IDashboardCardResponse[], string>({
      query: siteId => ({
        url: `/card/site/${siteId}`,
      }),
      providesTags: [TagType.DASHBOARD],
    }),

    // Pie Chart
    getSitePercentage: build.query<ISitePercentage, void>({
      query: () => ({
        url: '/pie',
      }),
      providesTags: [TagType.DASHBOARD],
    }),

    // Bar & Gauge Chart
    getParameterProfileStatistics: build.query<
      IParamStatisticsResponse<string, number>,
      IParamStatisticsRequest
    >({
      query: ({ siteId, paramgroup }) => ({
        url: `/bar&gauge/site/${siteId}?paramgroup=${paramgroup}`,
      }),
    }),

    // Radar Chart
    getSiteStatSummary: build.query<ISiteStatResponse<number>, ISiteStatRequest>({
      query: ({ siteId, statType }) => ({
        url: `/radar/site/${siteId}?statType=${statType}`,
      }),
      providesTags: [TagType.DASHBOARD],
    }),
  }),
});

export const {
  useGetParameterFiltersQuery,
  useGetDateFiltersQuery,
  useGetTimeSeriesQuery,
  useGetSitePercentageQuery,
  useGetDashboardCardValuesQuery,
  useGetSiteStatSummaryQuery,
  useGetParameterProfileStatisticsQuery,
} = dashboardApi;
