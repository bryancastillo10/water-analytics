import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    DeleteNotesResponse,
    CreateNotesResponse,
    INotesData
} from "@/features/stickynote/api/interface";

export const stickynoteApi = createApi({
    reducerPath: "stickynotes",
    tagTypes: ["getNotes"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "notes",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        createNotes: build.mutation<CreateNotesResponse, INotesData>({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["getNotes"]
        }),
        getNotes: build.query<INotesData[], void>({
            query: () => ({
                url: "/get"
            }),
            providesTags: ["getNotes"]
        }),
        deleteNotes: build.mutation<DeleteNotesResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["getNotes"]
        })
    })
});

export const {
    useCreateNotesMutation,
    useGetNotesQuery,
    useDeleteNotesMutation
} = stickynoteApi;