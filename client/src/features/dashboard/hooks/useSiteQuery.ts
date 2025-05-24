import { useEffect } from 'react';
import { useGetSiteByUserQuery } from '@/features/sites/api/sitesApi';
import type { ISiteData } from '@/features/sites/api/interface';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setSiteData, setSiteOptions } from '@/lib/redux/states/dashboardFilterSlice';

const useSiteQuery = () => {
  const dispatch = useAppDispatch();
  const { selectedSiteId, selectedSiteName, siteOptions } = useAppSelector(
    state => state.dashboard,
  );

  const { data: siteData, isLoading } = useGetSiteByUserQuery();

  useEffect(() => {
    if (siteData?.length) {
      dispatch(setSiteOptions(siteData.map((site: ISiteData) => site.siteName)));

      if (!selectedSiteId || !selectedSiteName) {
        dispatch(
          setSiteData({
            id: siteData[0]?.id!,
            siteName: siteData[0]?.siteName!,
          }),
        );
      }
    }
  }, [siteData, selectedSiteId, selectedSiteName, dispatch]);

  const getSiteIdByName = (siteName: string) => {
    const selectedSiteObj = siteData?.find((site: ISiteData) => site.siteName === siteName);

    if (selectedSiteObj) {
      dispatch(setSiteData({ id: selectedSiteObj.id, siteName: selectedSiteObj.siteName }));
    } else {
      dispatch(setSiteData({ id: '', siteName: '' }));
    }
  };

  return {
    siteOptions,
    selectedSiteName,
    selectedSiteId,
    getSiteIdByName,
    isLoading,
  };
};

export default useSiteQuery;
