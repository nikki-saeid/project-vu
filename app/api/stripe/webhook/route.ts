import { stripeController } from '@/modules/controllers/stripe.controller';
import { publicMiddleware } from '@/modules/middlewares/public.middleware';

export const POST = publicMiddleware.public(stripeController.webhook);
