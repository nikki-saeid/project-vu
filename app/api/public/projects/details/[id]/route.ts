import { projectController } from '@/modules/controllers/project.controller';
import { publicMiddleware } from '@/modules/middlewares/public.middleware';

export const GET = publicMiddleware.public(projectController.getPublicById);
