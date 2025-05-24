import { SiteRepository } from '@/site/site.repository';
import { SiteService } from '@/site/core/service/siteService';
import { SiteController } from '@/site/site.controller';

const siteRepository = new SiteRepository();

const siteService = new SiteService(siteRepository);

export const siteController = new SiteController(siteService);
