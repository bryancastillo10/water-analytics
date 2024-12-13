import { CreateSiteRequest, UpdateSiteRequest } from "@/site/core/interface/ISiteRepository";
import { SiteRepository } from "@/site/site.repository";

import { NotFoundError, ValidationError } from "@/infrastructure/errors/customErrors";
import { uploadImage } from "@/utils/cloudinary";


export class SiteService {
  constructor(private readonly siteRepository: SiteRepository) { }
  
  async createSite({ userId, rawData, file }: CreateSiteRequest) {
    
    const { siteData: nestedData } = rawData;
    const { siteName, location, description, sourceType } = nestedData;

    if (!siteName || !location || !description || !sourceType) {
      throw new ValidationError("siteName,location,description, and sourceType are required");
    }

    const isExistingUser = await this.siteRepository.verifyUser(userId);
    if (!isExistingUser) {
      throw new NotFoundError("User not found. The requested site cannot be created");
    }

    let imageUrl: string = "";
    if (file) {
        imageUrl = await uploadImage({
            filePath: file.path,
            folder: "sites",
            deleteLocalFile: true
        });
    }
  
    const newSite = await this.siteRepository.createSite({
      userId,
      siteData: { ...nestedData, imageUrl }
    });

    return newSite;
  }

  async getSiteByUser(userId: string) {
    if (!userId) {
      throw new NotFoundError("User Id not found");
    }

    const userSites = await this.siteRepository.getSiteByUser(userId);
    if (!userSites || null) {
      throw new NotFoundError("No sites were found for the user");
    }

    return userSites;
  }

  async updateSite({ siteId, rawData, file }: UpdateSiteRequest) {
    if (!siteId) {
      throw new NotFoundError("Site id was not found");
    }

    const { siteName, location, description, sourceType, imageUrl } = rawData;
  
    if (!siteName || !location || !description || !sourceType) {
      throw new ValidationError("Missing required site information");
    }

    let finalImageUrl = imageUrl;
    if (file) {
      finalImageUrl = await uploadImage({
        filePath: file.path,
        folder: "sites",
        deleteLocalFile: true
      });
    }

    const updatedSite = await this.siteRepository.updateSite(siteId, {
      siteName,
      location,
      description,
      sourceType,
      imageUrl: finalImageUrl
    });
      
      return updatedSite;
  }

  async deleteSite(siteId: string) {
    if (!siteId) {
      throw new NotFoundError("Site Id not found");
    }
      await this.siteRepository.deleteSite(siteId);
      return {
        message: "Site has been deleted successfully"
      }
  }
}