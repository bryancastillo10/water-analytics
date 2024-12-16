import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    DeleteNotesResponse,
    CreateNotesResponse,
    INotesData,
    UpdateNotesRequest,
    UpdateNotesResponse
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
        updateNotes: build.mutation<UpdateNotesResponse, UpdateNotesRequest>({
            query: ({id, notesData}) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: notesData
            }),
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
    useUpdateNotesMutation,
    useDeleteNotesMutation
} = stickynoteApi;