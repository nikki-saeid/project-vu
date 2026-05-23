import { reviewController } from '@/modules/controllers/review.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const DELETE = authMiddleware.user(reviewController.deleteById);
