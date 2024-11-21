enum WaterSourceType {
    DOMESTIC = "DOMESTIC",
    INDUSTRIAL = "INDUSTRIAL",
    AGRICULTURAL = "AGRICULTURAL",
    GROUNDWATER = "GROUNDWATER",
    SURFACE = "SURFACE WATER",
    OTHERS = "OTHERS"
}

export class SiteData {
    id!: string;
    siteName!: String;
    location!: String;
    description!: String;
    imageUrl!: String;
    sourceType: WaterSourceType = WaterSourceType.DOMESTIC;
    userId!: string;
}
