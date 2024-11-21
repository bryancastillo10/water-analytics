import { WaterSourceType } from "@prisma/client";

export class SiteData {
  id!: string;
  siteName!: string;
  location!: string;
  description!: string;
  imageUrl!: string;
  sourceType: WaterSourceType = WaterSourceType.DOMESTIC;
  userId!: string;
}
