import { PrismaClient } from "@prisma/client";
import { CreateSiteRequest, ISiteRepository } from "./core/interface/ISiteRepository";
import { UserData } from "@/user/core/entity/user";
import { SiteData } from "@/site/core/entity/site";


export class SiteRepository implements ISiteRepository {
  private prisma = new PrismaClient();

  createSite({ userId, siteData }: CreateSiteRequest): Promise<SiteData> {
    throw new Error("Method not implemented.");
  }
  verifyUser(userId: string): Promise<UserData | null> {
    throw new Error("Method not implemented.");
  }
  getSiteByUser(): Promise<SiteData | null> {
    throw new Error("Method not implemented.");
  }
  updateSite({ userId, siteData }: CreateSiteRequest): Promise<SiteData> {
    throw new Error("Method not implemented.");
  }
  deleteSite(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}