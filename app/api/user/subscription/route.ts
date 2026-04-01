import { subscriptionController } from '@/modules/controllers/subscription.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.user(subscriptionController.get);
