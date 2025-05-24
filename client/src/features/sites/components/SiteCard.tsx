import { MapPin, PencilSimpleLine, TrashSimple } from '@phosphor-icons/react';
import useDrawer from '@/hooks/useDrawer';

import SiteTag from '@/features/sites/components/SiteTag';
import type { ISiteData } from '@/features/sites/api/interface';

import { useAppSelector } from '@/lib/redux/hooks';
interface SiteCardProps {
  siteData: ISiteData;
}

const SiteCard = ({ siteData }: SiteCardProps) => {
  const theme = useAppSelector(state => state.theme.isDarkMode);

  const { handleOpenDrawer } = useDrawer();
  const { id, siteName, location, description, imageUrl, sourceType } = siteData;

  const updateSite = (id: string, siteData: ISiteData) => {
    handleOpenDrawer('Edit Monitoring Site Info', 'UpdateSiteForm', { id, siteData });
  };

  const deleteSite = (id: string, siteData: ISiteData) => {
    handleOpenDrawer('Delete Site Confirmation', 'DeleteSiteForm', { id, siteData });
  };

  return (
    <div
      className={`w-80 min-h-full group relative rounded-xl shadow-md overflow-hidden ${theme ? 'bg-darkGray' : 'bg-light'}`}
    >
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="bg-neutral/40 h-48 rounded-lg">
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt="site-photo"
                className="w-full h-full rounded-lg object-cover transition-translate duration-300 hover:translate-y-4 hover:translate-x-4 "
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-xl font-semibold ">{siteName}</h1>

            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span className="text-sm">{location}</span>
            </div>

            <SiteTag variant={sourceType} />
          </div>

          <p
            className={`text-sm text-pretty mt-2 line-clamp-3 ${theme ? 'text-neutral' : 'text-darkGray'}`}
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className={`absolute top-0 right-0 flex flex-col gap-y-4 opacity-0 group-hover:opacity-100
        rounded-bl-md px-2 py-2  text-primary font-bold ${theme ? 'bg-neutral' : 'bg-neutral/80'}`}
      >
        <div onClick={() => updateSite(id, siteData)} className="hover:scale-110 cursor-pointer">
          <PencilSimpleLine size="14" />
        </div>
        <TrashSimple
          onClick={() => deleteSite(id, siteData)}
          className="hover:scale-110 cursor-pointer"
          size="14"
        />
      </div>
    </div>
  );
};

export default SiteCard;
