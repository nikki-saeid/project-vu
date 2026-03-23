import { projectController } from '@/modules/controllers/project.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const PUT = authMiddleware.user(projectController.update);
export const DELETE = authMiddleware.user(projectController.delete);
