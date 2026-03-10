import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import type { LogoUploadResponse } from '@/lib/types/api';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const BUCKET_NAME = 'businesses';
const CACHE_CONTROL = '0';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to upload a logo'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return errorHandler({
                error: new Error('Missing file'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        const path = `${user.id}/logo.png`;

        const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
            cacheControl: CACHE_CONTROL,
            upsert: true,
        });

        if (uploadError) return errorHandler({ error: uploadError });

        const {
            data: { publicUrl },
        } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

        return new SuccessResponse<LogoUploadResponse>('Logo saved successfully', { logo_url: publicUrl }).send();
    } catch (error) {
        throw errorHandler({ error });
    }
}
