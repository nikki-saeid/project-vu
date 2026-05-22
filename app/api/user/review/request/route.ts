import { reviewController } from '@/modules/controllers/review.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const POST = authMiddleware.user(reviewController.request);
