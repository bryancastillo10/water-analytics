import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateMeasurementRequest,
  CreateMeasurementResponse,
  UpdateMeasurementResponse,
  DeleteMeasurementResponse,
  IMeasurementData,
  UpdateMeasurementRequest,
} from '@/features/waterquality/api/interface';
import { TagType } from '@/lib/mappings/tagTypes';

export const measurementApi = createApi({
  reducerPath: 'measurementApi',
  tagTypes: [TagType.MEASUREMENTS],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + 'water-quality-data',
    credentials: 'include',
  }),
  endpoints: build => ({
    createMeasurement: build.mutation<CreateMeasurementResponse, CreateMeasurementRequest>({
      query: ({ id, data }) => ({
        url: `/site/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TagType.MEASUREMENTS, TagType.DASHBOARD],
    }),
    getAllMeasurements: build.query<IMeasurementData[], void>({
      query: () => ({
        url: `/`,
      }),
      providesTags: [TagType.MEASUREMENTS],
    }),
    updateMeasurement: build.mutation<UpdateMeasurementResponse, UpdateMeasurementRequest>({
      query: ({ id, data }) => ({
        url: `update/measurement/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TagType.MEASUREMENTS, TagType.DASHBOARD],
    }),
    deleteMeasurement: build.mutation<DeleteMeasurementResponse, { id: string }>({
      query: ({ id }) => ({
        url: `delete/measurement/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagType.MEASUREMENTS, TagType.DASHBOARD],
    }),
  }),
});

export const {
  useCreateMeasurementMutation,
  useGetAllMeasurementsQuery,
  useUpdateMeasurementMutation,
  useDeleteMeasurementMutation,
} = measurementApi;
