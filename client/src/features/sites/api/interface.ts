export enum WaterSourceType {
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
    imageURL: string;
    sourceType: WaterSourceType;
}

export interface SiteDataWithFile extends Omit<SiteData, 'imageURL'>{
    imageFile: File | null;
}

export interface CreateSiteResponse extends SiteData {
    id: string;
    userId: string;
}

export interface UpdateSiteRequest {
    id: string;
    site: FormData;
}

export interface DeleteSiteResponse{
    message: string;
}

export interface MutateSiteResponse{
    message: string;
    site: SiteData
}
