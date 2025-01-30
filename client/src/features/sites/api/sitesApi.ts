import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    ISiteData,
    MutateSiteResponse,
    UpdateSiteRequest,
    DeleteSiteResponse,
} from "@/features/sites/api/interface";
import { TagType } from "@/lib/mappings/tagTypes";
export const sitesApi = createApi({
    reducerPath: "sitesApi",
    tagTypes:[TagType.SITES],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL + "site",
        credentials: 'include'
    }),
    endpoints: (build) => ({
        createSite: build.mutation<MutateSiteResponse, FormData>({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data
            }),
            invalidatesTags:[TagType.SITES, TagType.DASHBOARD]
        }),
        getSiteByUser: build.query<ISiteData[], void>({
            query: () => ({
                url: "/get"
            }),
            providesTags:[TagType.SITES]
        }),
        updateSite: build.mutation<MutateSiteResponse, UpdateSiteRequest>({
            query: ({ id, site }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: site
            }),
            invalidatesTags:[TagType.SITES, TagType.DASHBOARD]
        }),
        deleteSite: build.mutation<DeleteSiteResponse,{id:string}>({
            query: ({id}) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:[TagType.SITES, TagType.DASHBOARD]
        })

    })
});

export const {
    useCreateSiteMutation,
    useGetSiteByUserQuery,
    useUpdateSiteMutation,
    useDeleteSiteMutation
} = sitesApi;