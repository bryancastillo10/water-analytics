import { PrismaClient } from "@prisma/client";
import { CreateSiteRequest, ISiteRepository } from "@/site/core/interface/ISiteRepository";
import { SiteData } from "@/site/core/entity/site";


export class SiteRepository implements ISiteRepository {
  private prisma = new PrismaClient();

  async createSite(data: CreateSiteRequest): Promise<SiteData> {
    const newSite = await this.prisma.site.create({
      data: {
        userId: data.userId,
        siteName: data.siteData.siteName,
        location: data.siteData.location,
        description: data.siteData.description,
        imageUrl: data.siteData.imageUrl,
        sourceType: data.siteData.sourceType,
      },
    });

    return newSite as SiteData;
  }
  async verifyUser(userId: string): Promise<boolean> {
    const isExistingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return Boolean(isExistingUser);
  }


  async getSiteByUser(userId: string): Promise<SiteData[]> {
    const userSites = await this.prisma.site.findMany({
      where: { userId },
    });
    return userSites as SiteData[];
  }
  async updateSite(
    siteId: string,
    siteData: Partial<SiteData>
  ): Promise<SiteData | null> {
    const updatedSite = await this.prisma.site.update({
      where: { id: siteId },
      data: siteData,
    });
    return updatedSite as SiteData | null;
  }

  async deleteSite(siteId: string): Promise<void> {
    await this.prisma.site.delete({
      where: { id: siteId },
    });
  }
}