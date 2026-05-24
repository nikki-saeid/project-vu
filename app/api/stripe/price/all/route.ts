import { stripeController } from '@/modules/controllers/stripe.controller';
import { publicMiddleware } from '@/modules/middlewares/public.middleware';

export const GET = publicMiddleware.public(stripeController.price.getAll);
