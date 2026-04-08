import { projectController } from '@/modules/controllers/project.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.user(projectController.getById);
export const PUT = authMiddleware.user(projectController.updateById);
export const DELETE = authMiddleware.user(projectController.deleteById);
