import { WaterSourceType, type CreateSiteResponse } from "./interface";

export const mockSiteData: CreateSiteResponse[] = [
    {
        id: "1b201033",
        userId: "1010",
        siteName: "Marikina River",
        location: "Marikina, NCR, Philippines",
        description: "Major river system running through Metro Manila, crucial for domestic water supply",
        imageURL: "https://res.cloudinary.com/dzruafjwq/image/upload/v1732410419/domestic_water_tuqrjj.jpg",
        sourceType: WaterSourceType.DOMESTIC,
    },
    {
        id: "1b201034",
        userId: "1010",
        siteName: "Laguna Industrial Park Water Treatment Facility",
        location: "Santa Rosa, Laguna, Philippines",
        description: "Central water treatment facility serving multiple manufacturing plants",
        imageURL: "https://res.cloudinary.com/dzruafjwq/image/upload/v1732410434/industrial_water_aqag7u.jpg",
        sourceType: WaterSourceType.INDUSTRIAL,
    },
    {
        id: "1b201035",
        userId: "1010",
        siteName: "National Irrigation Administration Canal",
        location: "Nueva Ecija, Philippines",
        description: "Irrigation system supporting rice fields in Central Luzon",
        imageURL: "https://res.cloudinary.com/dzruafjwq/image/upload/v1732410415/agricultural_iwabd7.jpg",
        sourceType: WaterSourceType.AGRICULTURAL,
    },
    {
        id: "1b201036",
        userId: "1010",
        siteName: "Ogallala Aquifer Well Site",
        location: "Nebraska, USA",
        description: "Deep groundwater well tapping into the Ogallala Aquifer system",
        imageURL: "https://res.cloudinary.com/dzruafjwq/image/upload/v1732410432/groundwater_x81rgn.jpg",
        sourceType: WaterSourceType.GROUNDWATER,
    },
    {
        id: "1b201037",
        userId: "1010",
        siteName: "Lake Ontario Monitoring Station",
        location: "Toronto, Ontario, Canada",
        description: "Water quality monitoring station for one of the Great Lakes",
        imageURL: "https://res.cloudinary.com/dzruafjwq/image/upload/v1732410427/surface_water_pshwl0.jpg",
        sourceType: WaterSourceType.SURFACE,
    },
    {
        id: "1b201038",
        userId: "1010",
        siteName: "Rainwater Harvesting Facility",
        location: "Vancouver, British Columbia, Canada",
        description: "Modern rainwater collection and treatment system for sustainable water usage",
        imageURL: "https://res.cloudinary.com/dzruafjwq/image/upload/v1732410407/others_jbme5z.jpg",
        sourceType: WaterSourceType.OTHERS,
    }
];

