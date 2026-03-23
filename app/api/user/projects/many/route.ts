import { projectController } from '@/modules/controllers/project.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.user(projectController.getMany);
