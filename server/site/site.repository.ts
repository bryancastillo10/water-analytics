import { PrismaClient } from "@prisma/client";
import { CreateSiteRequest, ISiteRepository } from "./core/interface/ISiteRepository";
import { UserData } from "@/user/core/entity/user";
import { SiteData } from "@/site/core/entity/site";


export class SiteRepository implements ISiteRepository {
  createSite(data: CreateSiteRequest): Promise<SiteData> {
    throw new Error("Method not implemented.");
  }
  verifyUser(userId: string): Promise<UserData | null> {
    throw new Error("Method not implemented.");
  }
  getSiteByUser(userId: string): Promise<SiteData[]> {
    throw new Error("Method not implemented.");
  }
  updateSite(siteId: string, siteData: Partial<SiteData>): Promise<SiteData | null> {
    throw new Error("Method not implemented.");
  }
  deleteSite(siteId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private prisma = new PrismaClient();

 
}