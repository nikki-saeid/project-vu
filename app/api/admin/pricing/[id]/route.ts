import { adminController } from '@/modules/controllers/admin.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const PUT = authMiddleware.admin(adminController.pricing.updateById);
