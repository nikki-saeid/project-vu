import { stripeController } from '@/modules/controllers/stripe.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.user(stripeController.invoice.getManyByStripeCustomerId);
