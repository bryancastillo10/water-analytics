import { SiteData } from "@/site/core/entity/site";

export interface ISiteRepository {
  createSite(data: CreateSiteRepo): Promise<SiteData>;
  verifyUser(userId: string): Promise<boolean>;
  getSiteByUser(userId: string): Promise<SiteData[]>;
  updateSite(siteId: string, site: Partial<SiteDataInput>): Promise<SiteData | null>;
  deleteSite(siteId: string): Promise<void>;
}


export type SiteDataInput = Omit<SiteData, "id" | "userId">; 
export type FileInput = { path: string }; 


export interface CreateSiteRequest {
  rawData: {
    userId: string;
    siteData: SiteDataInput;
  };
  file?: FileInput;
}

export interface CreateSiteRepo {
  userId: string;
  siteData: SiteDataInput;
}

export interface UpdateSiteRequest {
  siteId: string;
  rawData: {siteData: SiteDataInput};
  file?: FileInput;
}
