import { adminController } from '@/modules/controllers/admin.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.admin(adminController.analytics.getNetRevenueByMonth);
