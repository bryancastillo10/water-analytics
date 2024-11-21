import { SiteData } from "@/site/core/entity/site";
import { UserData } from "@/user/core/entity/user";

export interface ISiteRepository {
  createSite({ userId, siteData }: CreateSiteRequest): Promise<SiteData>;
  verifyUser(userId: string): Promise<UserData | null>;
  getSiteByUser(): Promise<SiteData | null>;
  updateSite({ userId, siteData }: CreateSiteRequest): Promise<SiteData>;
  deleteSite(): Promise<void>;
}

export interface CreateSiteRequest {
    userId: string;
    siteData: SiteData;
}