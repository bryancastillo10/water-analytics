import { SiteRepository } from "@/site/site.repository";
import { CreateSiteRequest } from "../interface/ISiteRepository";

export class SiteService {
    constructor(private readonly siteRepository: SiteRepository) {
        
    }
    async createSite(siteData: CreateSiteRequest) {
        const { userId, siteData: {
            siteName,
            location,
            description,
            imageUrl,
            sourceType
        } } = siteData;

        if (!siteName || !location || !description || !sourceType) {
            throw new Error("siteName,location,description, and sourceType are required");
        }

        const isExistingUser = await this.siteRepository.verifyUser(userId);
        if (!isExistingUser) {
            throw new Error("User is not found. The requested site cannot be created");
        };

        const newSite = await this.siteRepository.createSite(siteData);

        return newSite;

     }
    
    async getSiteByUser() { }
    
    async updateSite() { }

    async deleteSite (){ }
}