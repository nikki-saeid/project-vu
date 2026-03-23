import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ParamsSlug } from '@/lib/types/api';
import { Business, PageStatusEnum } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { businessService } from '../services/business.service';

export const businessController = {
    // get by user id
    getByUserId: tryCatchWrapper(async (_, user: User) => {
        const business = await businessService.getByUserIdOrCreate(user.id, { email: user.email });
        return new SuccessResponse<Business>('business fetched successfully', business).send();
    }),

    // get by slug
    getBySlug: tryCatchWrapper(async (req: NextRequest, _, { params }: ParamsSlug) => {
        // param
        const { slug } = await params;

        const business = (await businessService.getBySlug(slug)) as Business;
        return new SuccessResponse<Business>('business fetched successfully', business).send();
    }),

    // update business
    update: tryCatchWrapper(async (req: NextRequest, user: User) => {
        // Get the body
        const formData = await req.formData();
        const logo = formData.get('logo');
        const body = JSON.parse(formData.get('body') as string);

        // Update the business
        const business = await businessService.update({ ...body, user_id: user.id }, logo as File);
        return new SuccessResponse<Business>('Your business profile updated successfully', business).send();
    }),

    // update page status
    updatePageStatus: tryCatchWrapper(async (req: NextRequest, user: User) => {
        // Get the body
        const body = await req.json();
        const status = body?.status as PageStatusEnum | undefined;

        // Update the business
        const business = await businessService.update({ user_id: user.id, page_status: status });
        return new SuccessResponse<Business>('Page status updated successfully', business).send();
    }),
};
