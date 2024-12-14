import { PrismaClient, WaterSourceType } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError } from "@/infrastructure/errors/customErrors";

import { CreateSiteRepo, ISiteRepository } from "@/site/core/interface/ISiteRepository";
import { SiteData } from "@/site/core/entity/site";

export class SiteRepository implements ISiteRepository {
  private readonly fallback_img = "https://res.cloudinary.com/dzruafjwq/image/upload/v1732538346/ocean_iwsix1.jpg";
  private prisma = new PrismaClient();

  async createSite(data: CreateSiteRepo): Promise<SiteData> {
    const { userId, siteData } = data;
    const { siteName, location, description, imageUrl, sourceType } = siteData;
    try {
      const validSourceType = Object.values(WaterSourceType).includes(sourceType) ?
        sourceType : WaterSourceType.DOMESTIC;
      
      const newSite = await this.prisma.site.create({
        data: {
            userId,
            siteName,
            location,
            description,
            imageUrl: imageUrl || this.fallback_img,
            sourceType: validSourceType
          }
      });
      
      return newSite as SiteData;
    }
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at createSite method");
      }
      throw error;
    }
  }

  async verifyUser(userId: string): Promise<boolean> {
    try {
      const isExistingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      return Boolean(isExistingUser);
    }
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         console.error(error.message);
         throw new DatabaseError("Database error at verifyUser method");
       }
      throw Error;
    }
  }


  async getSiteByUser(userId: string): Promise<SiteData[]> {
    try {
      const userSites = await this.prisma.site.findMany({
      where: { userId },
      });
      return userSites as SiteData[];
    }
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         console.error(error.message);
         throw new DatabaseError("Database error at getSiteByUser method");
       }
      throw Error;
    }
  }

  async updateSite(siteId: string, site: Partial<SiteData>): Promise<SiteData | null> {
    try {
      const updatedSite = await this.prisma.site.update({
      where: { id: siteId },
      data: site,
      });
      
    return updatedSite as SiteData | null;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         console.error(error.message);
         throw new DatabaseError("Database error at updateSite method");
       }
      throw error;
    }
  }

  async deleteSite(siteId: string): Promise<void> {
    try {
       await this.prisma.site.delete({
         where: { id: siteId },
       });
    } catch (error) {
       if (error instanceof PrismaClientKnownRequestError) {
         console.error(error.message);
         throw new DatabaseError("Database error at deleteSite method");
       }
      throw Error;
    }
  }
}