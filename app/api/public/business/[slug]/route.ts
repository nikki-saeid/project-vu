import { businessController } from '@/modules/controllers/business.controller';
import { publicMiddleware } from '@/modules/middlewares/public.middleware';

export const GET = publicMiddleware.public(businessController.getBySlug);
