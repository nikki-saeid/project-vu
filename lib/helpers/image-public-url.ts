'use server';
import { createClient } from '@/lib/supabase/server';
import { parsePostGisPoint } from './postgis';
import { ProjectWithImages } from '../types/api';

export async function getStoragePublicUrl(image_url: string) {
    const supabase = await createClient();
    const { data: publicUrl } = supabase.storage.from('businesses').getPublicUrl(image_url);
    return publicUrl.publicUrl;
}

export async function getStoragePublicUrls(projects: ProjectWithImages[]) {
    const _projects: ProjectWithImages[] = [];
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const images = (project.project_image ?? []).sort(
            (a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order,
        );
        const coords = parsePostGisPoint(project.location as string | null);

        const publicUrls = await Promise.all(images.map(async (image) => await getStoragePublicUrl(image.image_url)));

        _projects.push({
            ...project,
            project_image: images.map((image, index) => ({ ...image, image_url: publicUrls[index] })),
            ...(coords && { lng: coords.lng, lat: coords.lat }),
        });
    }

    return _projects;
}
