import { businessController } from '@/modules/controllers/business.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.user(businessController.getByUserId);
export const PUT = authMiddleware.user(businessController.update);
