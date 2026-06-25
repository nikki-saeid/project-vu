import { userController } from '@/modules/controllers/user.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const POST = authMiddleware.user(userController.email.welcome);
