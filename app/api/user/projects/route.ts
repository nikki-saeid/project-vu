import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Project } from '@/lib/types/db';
import { projectCreateSchema } from '@/lib/validators/user/project';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to create a project'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        const { data: business } = await supabase.from('businesses').select('id').eq('user_id', user.id).maybeSingle();
        if (!business?.id) {
            return errorHandler({
                error: new Error('You need a business to create a project'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        const body = await request.json();
        const parsed = projectCreateSchema.safeParse(body);
        if (!parsed.success) {
            const first = parsed.error.flatten().fieldErrors;
            const message = Object.values(first).flat().join(' ') || 'Validation failed';
            return errorHandler({
                error: new Error(message),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message },
            });
        }
        
        const { title, description, address, latitude, longitude } = parsed.data;
        const location = `POINT(${longitude} ${latitude})`;

        const { data, error } = await supabase
            .from('projects')
            .insert({
                title,
                description,
                address,
                location,
                business_id: business.id,
            })
            .select()
            .single();

        if (error) return errorHandler({ error });

        return new SuccessResponse<Project>('Project created successfully', data as unknown as Project).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
