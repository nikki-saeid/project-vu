import { businessController } from '@/modules/controllers/business.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const PUT = authMiddleware.user(businessController.updateIsOnboarded);
