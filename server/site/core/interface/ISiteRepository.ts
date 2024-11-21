import { SiteData } from "@/site/core/entity/site";
import { UserData } from "@/user/core/entity/user";

export interface ISiteRepository {
  createSite(data: CreateSiteRequest): Promise<SiteData>;
  verifyUser(userId: string): Promise<UserData | null>;
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
