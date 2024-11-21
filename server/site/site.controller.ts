import { Request, Response } from "express";
import { SiteService } from "@/site/core/service/siteService";

export class SiteController{
    constructor(private readonly siteService: SiteService) {
        this.createSite = this.createSite.bind(this);
        this.getSiteByUser = this.getSiteByUser.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    async createSite(req: Request, res: Response) { 
        try {
            const siteData = req.body;
            const newSite = await this.siteService.createSite(siteData);

            res.status(201).json({ message: "New site has been added", site: newSite });

        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async getSiteByUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const userSites = await this.siteService.getSiteByUser(userId);
            res.status(200).json({ userSites });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
     }

     }
    
    async updateSite(req: Request, res: Response) { 
        try {
            
        } catch (error: any) {
            
        }
    }
    
    async deleteSite(req: Request, res: Response) { 
                try {
                } catch (error: any) {
                    
                }
    }
}