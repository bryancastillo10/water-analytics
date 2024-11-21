import { SiteData } from "@/site/core/entity/site";


export interface ISiteRepository {
  createSite(siteData: CreateSiteRequest): Promise<SiteData>;
  verifyUser(userId: string): Promise<boolean>;
  getSiteByUser(userId: string): Promise<SiteData[]>;
  updateSite(
    siteId: string,
    siteData: Partial<SiteData>
  ): Promise<SiteData | null>;
  deleteSite(siteId: string): Promise<void>;
}

export interface CreateSiteRequest {
  userId: string;
  siteData: Omit<SiteData, "id" | "userId" >;
}

export interface UpdateSiteRequest {
  siteId: string;
  siteData: Omit<SiteData, "id" | "userId">;
}
