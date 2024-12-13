import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "@/infrastructure/middleware/type";
import { SiteService } from "@/site/core/service/siteService";


export class SiteController{
    constructor(private readonly siteService: SiteService) {
        this.createSite = this.createSite.bind(this);
        this.getSiteByUser = this.getSiteByUser.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    async createSite(req: CustomRequest, res: Response, next: NextFunction) { 
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new Error("User ID is undefined. Ensure auth middleware is applied");
            }

            const rawData = JSON.parse(req.body.siteData);
            const { file } = req;
            const newSite = await this.siteService.createSite({userId,rawData, file});
 
            res.status(201).json({ message: "New site has been added", site: newSite });

        } catch (error:any) {
            next(error);
        }
    }
    
    async getSiteByUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new Error("User ID is undefined. Ensure auth middleware is applied");
            }
            const userSites = await this.siteService.getSiteByUser(userId);
            res.status(200).json(userSites);
        } catch (error) {
            next(error);
     }

     }
    
    async updateSite(req: Request, res: Response, next: NextFunction) { 
        try {
            const siteId = req.params.id;
            const rawData = req.body;
            const { file } = req;
          
            const updatedSite = await this.siteService.updateSite({ siteId, rawData, file });

            res.status(200).json({ message: "Site has been updated successfully", site: updatedSite });

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