import { SiteRepository } from "@/site/site.repository";
import {
  CreateSiteRequest,
  UpdateSiteRequest,
} from "@/site/core/interface/ISiteRepository";

export class SiteService {
  constructor(private readonly siteRepository: SiteRepository) {}
  async createSite(siteData: CreateSiteRequest) {
    const {
      userId,
      siteData: { siteName, location, description, sourceType },
    } = siteData;

    if (!siteName || !location || !description || !sourceType) {
      throw new Error(
        "siteName,location,description, and sourceType are required"
      );
    }

    const isExistingUser = await this.siteRepository.verifyUser(userId);
    if (!isExistingUser) {
      throw new Error(
        "User is not found. The requested site cannot be created"
      );
    }

    const newSite = await this.siteRepository.createSite(siteData);

    return newSite;
  }

  async getSiteByUser(userId: string) {
    if (!userId) {
      throw new Error("User id was not found");
    }
    const userSites = await this.siteRepository.getSiteByUser(userId);
    if (!userSites || null) {
      throw new Error("No sites were found for the user");
    }

    return userSites;
  }

  async updateSite({ siteId, siteData }: UpdateSiteRequest) {
    if (!siteId) {
      throw new Error("Site id was not found");
    }

      const updatedSite = await this.siteRepository.updateSite(siteId, siteData);
      
      return updatedSite;
  }

  async deleteSite(siteId: string) {
    if (!siteId) {
      throw new Error("Site id was not found");
    }
      await this.siteRepository.deleteSite(siteId);
      return {
          message: "Site has been deleted successfully"
      }
  }
}