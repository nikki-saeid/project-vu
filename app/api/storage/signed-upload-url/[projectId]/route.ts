import { storageController } from '@/modules/controllers/storage.controller';
import { authMiddleware } from '@/modules/middlewares/auth.middleware';

export const GET = authMiddleware.user(storageController.createSignedUploadUrl);
