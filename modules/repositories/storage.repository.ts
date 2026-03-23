import { createClient } from '@/lib/supabase/server';

const BUCKET_NAME = 'businesses';
const CACHE_CONTROL = '0';

export const storageRepository = {
    // get by user id
    upload: async function (path: string, buffer: Buffer) {
        const supabase = await createClient();

        const { error } = await supabase.storage.from(BUCKET_NAME).upload(path, buffer, {
            cacheControl: CACHE_CONTROL,
            contentType: 'image/webp',
            upsert: true,
        });

        if (error) throw error;

        return path;
    },
};
