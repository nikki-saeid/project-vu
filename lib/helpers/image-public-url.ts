'use server';
import { createClient } from '@/lib/supabase/server';

export async function getStoragePublicUrl(image_url: string) {
    const supabase = await createClient();
    const { data: publicUrl } = supabase.storage.from('businesses').getPublicUrl(image_url);
    return publicUrl.publicUrl;
}
