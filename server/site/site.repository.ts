import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError } from "@/infrastructure/errors/customErrors";

import { CreateSiteRequest, ISiteRepository } from "@/site/core/interface/ISiteRepository";
import { SiteData } from "@/site/core/entity/site";

export class SiteRepository implements ISiteRepository {
  private readonly fallback_img = "https://res.cloudinary.com/dzruafjwq/image/upload/v1732538346/ocean_iwsix1.jpg";
  private prisma = new PrismaClient();

  async createSite(data: CreateSiteRequest): Promise<SiteData> {
    try {
      const newSite = await this.prisma.site.create({
      data: {
        userId: data.userId,
        siteName: data.siteData.siteName,
        location: data.siteData.location,
        description: data.siteData.description,
        imageUrl: data.siteData.imageUrl || this.fallback_img,
        sourceType: data.siteData.sourceType,
      },
    });

    return newSite as SiteData;
    }
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at createSite method");
      }
      throw Error;
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

  async updateSite(siteId: string, siteData: Partial<SiteData>): Promise<SiteData | null> {
    try {
      const updatedSite = await this.prisma.site.update({
      where: { id: siteId },
      data: siteData,
      });
      
    return updatedSite as SiteData | null;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
         console.error(error.message);
         throw new DatabaseError("Database error at updateSite method");
       }
      throw Error;
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