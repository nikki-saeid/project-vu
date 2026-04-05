import { stripeController } from '@/modules/controllers/stripe.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const POST = authMiddleware.user(stripeController.subscription.resumeById);
