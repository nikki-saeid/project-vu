import { reviewController } from '@/modules/controllers/review.controller';
import { publicMiddleware } from '@/modules/middlewares/public.middleware';

export const GET = publicMiddleware.public(reviewController.getManyByBusinessSlug);
