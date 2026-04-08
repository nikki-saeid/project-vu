import { createClient } from '@/lib/supabase/server';
import { Project } from '@/lib/types/db';
import { storageService } from '../services/storage.service';

export const projectRepository = {
    getById: async function (id: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').select("*").eq('id', id).maybeSingle();

        if (error) throw error;

        return data;
    },

    // create
    create: async function (project: Partial<Project>) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').insert(project).select().maybeSingle();

        if (error) throw error;

        return data;
    },

    // get many projects
    getManyWithBusinessId: async function (businessId: string) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('business_id', businessId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return await storageService.getProjectsStoragePublicUrls(data);
    },

    // update project by id
    updateById: async function (id: string, project: Partial<Project>) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().maybeSingle();

        if (error) throw error;

        return data;
    },

    // delete project by id
    deleteById: async function (id: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').delete().eq('id', id).select().maybeSingle();

        if (error) throw error;

        return data;
    },
};
