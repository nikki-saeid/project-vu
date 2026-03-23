import { createClient } from '@/lib/supabase/server';
import { ProjectImage } from '@/lib/types/db';

export const projectImagesRepository = {
    // create
    createMany: async function (projectImages: Partial<ProjectImage>[]) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('project_image').upsert(projectImages).select();

        if (error) throw error;

        return data;
    },

    // remove
    removeManyByProjectId: async function (projectId: string) {
        const supabase = await createClient();

        const { error, data } = await supabase.from('project_image').delete().eq('project_id', projectId).select('image_url');

        if (error) throw error;

        return data;
    },
};
