import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    MutateMeasurementRequest,
    CreateMeasurementResponse,
    GetMeasurementRequest,
    GetMeasurementResponse,
    UpdateMeasurementResponse,
    DeleteMeasurementResponse
} from "@/features/waterquality/api/interface";

export const measurementApi = createApi({
    reducerPath: "measurementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "water-quality-data/measurement",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        createMeasurement: build.mutation<CreateMeasurementResponse, MutateMeasurementRequest>({
            query: ({ id, data }) => ({
                url: `/site/${id}`,
                method: "POST",
                body: data
            })
        }),
        getMeasurementBySite: build.query<GetMeasurementResponse, GetMeasurementRequest>({
            query: (id) => ({
                url: `/site/${id}`,
            })
        }),
        updateMeasurement: build.mutation<UpdateMeasurementResponse, MutateMeasurementRequest>({
            query: ({ id, data }) => ({
                url: `/measurement/${id}`,
                method: "PUT",
                body: data
            })
        }),
        deleteMeasurement: build.mutation<DeleteMeasurementResponse, { id: string }>({
            query: (id) => ({
                url: `/measurement/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useCreateMeasurementMutation,
    useGetMeasurementBySiteQuery,
    useUpdateMeasurementMutation,
    useDeleteMeasurementMutation
} = measurementApi;