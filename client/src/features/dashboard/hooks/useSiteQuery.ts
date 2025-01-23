import { useState, useEffect } from "react";
import { useGetSiteByUserQuery } from "@/features/sites/api/sitesApi";
import type { ISiteData } from "@/features/sites/api/interface";


const useSiteQuery = () => {
    const [selectedSite, setSelectedSite] = useState<string | null>(null);
    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
    
    const { data : siteData, isLoading } = useGetSiteByUserQuery();

    const siteNames = siteData?.map((site: ISiteData) => site.siteName) || [];

    useEffect(() => {
        if (siteData?.length && !selectedSite) {
            setSelectedSite(siteData[0]!.siteName);
            setSelectedSiteId(siteData[0]!.id);
        }

    }, [siteData]);

    const getSiteIdByName = (selectedSiteName: string) => {
        const selectedSiteObj = siteData?.find((site: ISiteData) => site.siteName === selectedSiteName);

        if (selectedSiteObj) {
            setSelectedSite(selectedSiteObj.siteName);
            setSelectedSiteId(selectedSiteObj.id);
        } else {
            setSelectedSite(null);
            setSelectedSiteId(null);
        }
    };

    return {
        siteNames,
        selectedSite,
        selectedSiteId,
        getSiteIdByName,
        isLoading
    }
}

export default useSiteQuery;
