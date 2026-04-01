import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ControllerProps, ParamsPlan } from '@/lib/types/api';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripeService } from '../services/stripe.service';

export const stripeController = {
    // get by user id
    getCheckoutSessionByPlan: tryCatchWrapper(async function ({ user, context }: ControllerProps<ParamsPlan>) {
        // Get the project id
        if (!context) throw new Error('Id is required');
        const params = await context.params;
        const { plan } = params;

        const session = await stripeService.getCheckoutSessionByPlan(plan, user.id);

        return new SuccessResponse<Stripe.Checkout.Session>('Checkout Session retrieved successfully', session).send();
    }),

    webhook: tryCatchWrapper(async function ({ req }: ControllerProps) {
        // Get the project id
        const requestBuffer = await req.text();
        const stripeSignature = (await headers()).get('stripe-signature')!;

        await stripeService.webhook(requestBuffer, stripeSignature);

        return new SuccessResponse('Payment successful', null).send();
    }),
};
