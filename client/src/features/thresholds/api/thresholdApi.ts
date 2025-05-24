import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  UpdateThresholdRequest,
  IThresholdData,
  UpdateThresholdResponse,
} from '@/features/thresholds/api/interface';
import { TagType } from '@/lib/mappings/tagTypes';

export const thresholdApi = createApi({
  reducerPath: 'threshold',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + 'threshold',
    credentials: 'include',
  }),
  tagTypes: [TagType.THRESHOLD],
  endpoints: build => ({
    getThreshold: build.query<IThresholdData[], { id: string }>({
      query: ({ id }) => ({
        url: `/get?id=${encodeURIComponent(id)}`,
      }),
      providesTags: [TagType.THRESHOLD],
    }),
    updateThreshold: build.mutation<UpdateThresholdResponse, UpdateThresholdRequest[]>({
      query: data => ({
        url: '/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TagType.THRESHOLD, TagType.DASHBOARD],
    }),
  }),
});

export const { useGetThresholdQuery, useUpdateThresholdMutation } = thresholdApi;
