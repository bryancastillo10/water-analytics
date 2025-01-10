import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    MutateMeasurementRequest,
    CreateMeasurementResponse,
    UpdateMeasurementResponse,
    DeleteMeasurementResponse,
    IMeasurementData,
    UpdateMeasurementRequest
} from "@/features/waterquality/api/interface";

export const measurementApi = createApi({
    reducerPath: "measurementApi",
    tagTypes: ["getMeasurements"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "water-quality-data",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        createMeasurement: build.mutation<CreateMeasurementResponse, MutateMeasurementRequest>({
            query: ({ id, data }) => ({
                url: `/site/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags:["getMeasurements"]
        }),
        getAllMeasurements: build.query<IMeasurementData[], void>({
            query: () => ({
                url: `/`,
            }),
            providesTags:["getMeasurements"]
        }),
        updateMeasurement: build.mutation<UpdateMeasurementResponse, UpdateMeasurementRequest>({
            query: ({ id, data }) => ({
                url: `/measurement/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags:["getMeasurements"]
        }),
        deleteMeasurement: build.mutation<DeleteMeasurementResponse, {id: string} >({
            query: ({id}) => ({
                url: `/measurement/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["getMeasurements"]
        })
    })
});

export const {
    useCreateMeasurementMutation,
    useGetAllMeasurementsQuery,
    useUpdateMeasurementMutation,
    useDeleteMeasurementMutation
} = measurementApi;