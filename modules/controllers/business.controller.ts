import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import type { ControllerProps, ParamsSlug } from '@/lib/types/api';
import { Business, PageStatusEnum } from '@/lib/types/db';
import { businessService } from '../services/business.service';

export const businessController = {
    // get by user id
    getByUserId: tryCatchWrapper(async ({ user }: ControllerProps) => {
        const business = await businessService.getByUserIdOrCreate(user.id, { email: user.email });
        return new SuccessResponse<Business>('business fetched successfully', business).send();
    }),

    // get by slug
    getBySlug: tryCatchWrapper(async ({ user, context }: ControllerProps<ParamsSlug>) => {
        // param
        if (!context) throw new Error('Slug is required');
        const params = await context.params;
        const { slug } = params;

        const business = (await businessService.getBySlug(slug, user ? user.id : null)) as Business;
        return new SuccessResponse<Business>('business fetched successfully', business).send();
    }),

    // update business
    update: tryCatchWrapper(async ({ req, user }: ControllerProps) => {
        // Get the body
        const formData = await req.formData();
        const logo = formData.get('logo');
        const body = JSON.parse(formData.get('body') as string);

        // Update the business
        const business = await businessService.update({ ...body, user_id: user.id }, logo as File);
        return new SuccessResponse<Business>('Your business profile updated successfully', business).send();
    }),

    // update page status
    updatePageStatus: tryCatchWrapper(async ({ req, user }: ControllerProps) => {
        // Get the body
        const body = await req.json();
        const status = body?.status as PageStatusEnum | undefined;

        // Update the business
        const business = await businessService.update({ user_id: user.id, page_status: status });
        return new SuccessResponse<Business>('Page status updated successfully', business).send();
    }),

    updateIsOnboarded: tryCatchWrapper(async ({ req, user }: ControllerProps) => {
        // Get the body
        const body = await req.json();
        const is_onboarded = body?.is_onboarded as boolean | undefined;

        // Update the business
        const business = await businessService.update({ user_id: user.id, is_onboarded });
        return new SuccessResponse<Business>('Page status updated successfully', business).send();
    }),
};
