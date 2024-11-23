import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    SiteData,
    MutateSiteResponse,
    UpdateSiteRequest,
    DeleteSiteResponse
} from "@/features/sites/api/interface";

export const sitesApi = createApi({
    reducerPath: "sitesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: 'include'
    }),
    endpoints: (build) => ({
        createSite: build.mutation<MutateSiteResponse, SiteData>({
            query: (data) => ({
                url: "site/create",
                method: "POST",
                body: data
            })
        }),
        getSiteByUser: build.query<{ id: string }, SiteData>({
            query: (id) => ({
                url: `site/user/${id}`
            })
        }),
        updateSite: build.mutation<MutateSiteResponse, UpdateSiteRequest>({
            query: ({ id, site }) => ({
                url: `site/update/${id}`,
                method: "PUT",
                body: site
            })
        }),
        deleteSite: build.mutation<{ id: string }, DeleteSiteResponse>({
            query: (id) => ({
                url: `site/delete/${id}`,
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