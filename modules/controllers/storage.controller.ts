import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate, CreateSignedUploadUrlResponse, ParamsProjectId } from '@/lib/types/api';
import { randomUUID } from 'crypto';
import { storageService } from '../services/storage.service';

export const storageController = {
    // get by user id
    createSignedUploadUrl: tryCatchWrapperPrivate(
        async ({ user, contextParams, contextSearchParams }: ControllerPropsPrivate<ParamsProjectId>) => {
            // param
            if (!contextParams) throw new Error('Project Id is required');
            const params = await contextParams.params;
            const { projectId } = params;

            if (!contextSearchParams) throw new Error('file type is required');
            const fileType = contextSearchParams.get('fileType')?.includes('video') ? 'video' : 'image';

            const fileName = randomUUID();

            const path = `${user.id}/projects/${projectId}/${fileType}/${fileName}`;

            const data = await storageService.createSignedUploadUrl(path);
            return new SuccessResponse<CreateSignedUploadUrlResponse>('Signed upload url created successfully', {
                ...data,
                projectId,
            }).send();
        },
    ),
};
