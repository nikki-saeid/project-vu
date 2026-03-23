import { userController } from '@/modules/controllers/user.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const PUT = authMiddleware.user(userController.update);
export const DELETE = authMiddleware.user(userController.delete);
