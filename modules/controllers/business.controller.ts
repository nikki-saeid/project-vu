import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { Business } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { businessService } from '../services/business.service';

export const businessController = {
    // get by user id
    getByUserId: async (req: NextRequest, user: User) => {
        try {
            const business = await businessService.getByUserIdOrCreate(user.id, { email: user.email });
            return new SuccessResponse<Business>('business fetched successfully', business).send();
        } catch (error) {
            return errorHandler({ error });
        }
    },

    // update business
    update: async (req: NextRequest, user: User) => {
        try {
            // Get the body
            const formData = await req.formData();

            const logo = formData.get('logo');
            const body = JSON.parse(formData.get('body') as string);

            const business = await businessService.update({ ...body, user_id: user.id }, logo as File | null);
            return new SuccessResponse<Business>('business updated successfully', business).send();
        } catch (error) {
            return errorHandler({ error });
        }
    },
};
