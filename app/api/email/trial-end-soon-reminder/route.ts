import { userController } from '@/modules/controllers/user.controller';
import { publicMiddleware } from '@/modules/middlewares/public.middleware';

export const POST = publicMiddleware.public(userController.email.trialEndSoonReminder);
