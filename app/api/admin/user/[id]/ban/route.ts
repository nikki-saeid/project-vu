import { adminController } from '@/modules/controllers/admin.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const POST = authMiddleware.admin(adminController.user.banById);
