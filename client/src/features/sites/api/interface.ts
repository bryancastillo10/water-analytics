export enum WaterSourceType {
  DOMESTIC = 'DOMESTIC',
  INDUSTRIAL = 'INDUSTRIAL',
  AGRICULTURAL = 'AGRICULTURAL',
  GROUNDWATER = 'GROUNDWATER',
  SURFACE = 'SURFACE',
  OTHERS = 'OTHERS',
}

export interface ISiteData {
  id: string;
  userId: string;
  siteName: string;
  location: string;
  description: string;
  imageUrl: string;
  sourceType: WaterSourceType;
}

export interface SiteDataWithFile extends Omit<ISiteData, 'imageURL'> {
  imageFile: File | null;
}

export interface CreateSiteResponse extends ISiteData {
  id: string;
  userId: string;
}

export interface UpdateSiteRequest {
  id: string;
  site: FormData;
}

export interface DeleteSiteResponse {
  message: string;
}

export interface MutateSiteResponse {
  message: string;
  site: ISiteData;
}
