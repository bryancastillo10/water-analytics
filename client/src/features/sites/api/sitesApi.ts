import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    SiteData,
    MutateSiteResponse,
    UpdateSiteRequest,
    DeleteSiteResponse,
} from "@/features/sites/api/interface";

export const sitesApi = createApi({
    reducerPath: "sitesApi",
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
            })
        }),
        getSiteByUser: build.query<{ id: string }, SiteData>({
            query: (id) => ({
                url: `/user/${id}`
            })
        }),
        updateSite: build.mutation<MutateSiteResponse, UpdateSiteRequest>({
            query: ({ id, site }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: site
            })
        }),
        deleteSite: build.mutation<{ id: string }, DeleteSiteResponse>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            })
        })

    })
});

export const {
    useCreateSiteMutation,
    useGetSiteByUserQuery,
    useUpdateSiteMutation,
    useDeleteSiteMutation
} = sitesApi;