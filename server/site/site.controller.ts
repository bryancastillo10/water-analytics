import { Request, Response, NextFunction } from "express";
import { SiteService } from "@/site/core/service/siteService";
import { uploadImage } from "@/utils/cloudinary";

export class SiteController{
    constructor(private readonly siteService: SiteService) {
        this.createSite = this.createSite.bind(this);
        this.getSiteByUser = this.getSiteByUser.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    async createSite(req: Request, res: Response, next: NextFunction) { 
        try {
            const siteData = JSON.parse(req.body.siteData);
            const { file } = req;

            let imageURL: string | null = null;
            if (file) {
                imageURL = await uploadImage(file.path);
            }
            siteData.imageURL = imageURL;
            
            const newSite = await this.siteService.createSite(siteData);

            res.status(201).json({ message: "New site has been added", site: newSite });

        } catch (error:any) {
            next(error);
        }
    }
    
    async getSiteByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const userSites = await this.siteService.getSiteByUser(userId);
            res.status(200).json({ userSites });
        } catch (error) {
            next(error);
     }

     }
    
    async updateSite(req: Request, res: Response, next: NextFunction) { 
        try {
            const siteId = req.params.id;
            const siteData = req.body;
            const updatedSite = await this.siteService.updateSite({siteId,siteData});
            res.status(200).json({ message:"Site has been updated successfully" ,updatedSite });
        } catch (error) {
            next(error);
        }
    }
    
    async deleteSite(req: Request, res: Response, next: NextFunction) { 
        try {
            const siteId = req.params.id;
            const message = await this.siteService.deleteSite(siteId);

            res.status(200).json({ message: message });
            } catch (error) {
               next(error);
        }
    }
}