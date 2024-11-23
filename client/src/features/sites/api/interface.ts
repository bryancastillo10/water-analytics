enum WaterSourceType {
    DOMESTIC = "DOMESTIC",
    INDUSTRIAL = "INDUSTRIAL",
    AGRICULTURAL = "AGRICULTURAL",
    GROUNDWATER = "GROUNDWATER",
    SURFACE = "SURFACE",
    OTHERS = "OTHERS"
}

export interface SiteData {
    siteName: string;
    location: string;
    description: string;
    sourceType: WaterSourceType;
}

export interface UpdateSiteRequest {
    id: string;
    site: SiteData
}

export interface DeleteSiteResponse{
    message: string;
}

export interface MutateSiteResponse{
    message: string;
    site: SiteData
}
