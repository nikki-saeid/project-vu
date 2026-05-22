import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate, tryCatchWrapperPublic } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate, ControllerPropsPublic, ParamsId, ParamsSlug } from '@/lib/types/api';
import { Review } from '@/lib/types/db';
import { reviewService } from '../services/review.service';

export const reviewController = {
    request: tryCatchWrapperPrivate(async ({ req, user }: ControllerPropsPrivate) => {
        // Get the body
        const body = await req.json();

        // Create the review
        const review = await reviewService.request(user.id, body);
        return new SuccessResponse<Review>('Review request sent successfully', review).send();
    }),

    getMany: tryCatchWrapperPrivate(async function ({ user }: ControllerPropsPrivate) {
        const reviews = await reviewService.getMany(user.id);
        return new SuccessResponse<Review[]>('Reviews fetched successfully', reviews).send();
    }),

    getById: tryCatchWrapperPublic(async function ({ contextParams }: ControllerPropsPublic<ParamsId>) {
        // Get the project id
        if (!contextParams) throw new Error('Id is required');
        const params = await contextParams.params;
        const { id } = params;

        const review = await reviewService.getById(id);
        return new SuccessResponse<Review>('Review fetched successfully', review).send();
    }),

    updateById: tryCatchWrapperPublic(async function ({ contextParams, req }: ControllerPropsPublic<ParamsId>) {
        // Get the project id
        if (!contextParams) throw new Error('Id is required');
        const params = await contextParams.params;
        const { id } = params;

        // Get the body
        const body = await req.json();

        const review = await reviewService.updateById(id, { ...body, status: 'done' });
        return new SuccessResponse<Review>('Review submitted successfully', review).send();
    }),

    getManyByBusinessSlug: tryCatchWrapperPublic(async function ({ contextParams }: ControllerPropsPublic<ParamsSlug>) {
        // Get the business slug
        if (!contextParams) throw new Error('Slug is required');
        const params = await contextParams.params;
        const { slug } = params;

        const projects = await reviewService.getManyByBusinessSlug(slug);
        return new SuccessResponse<Review[]>('Reviews fetched successfully', projects).send();
    }),
};
