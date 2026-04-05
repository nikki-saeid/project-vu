import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ControllerProps, ParamsId, ParamsPlan, ParamsStripeCustomerId } from '@/lib/types/api';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripeService } from '../services/stripe.service';

export const stripeController = {
    // webhook
    webhook: tryCatchWrapper(async function ({ req }: ControllerProps) {
        // Get the project id
        const requestBuffer = await req.text();
        const stripeSignature = (await headers()).get('stripe-signature')!;

        await stripeService.webhook(requestBuffer, stripeSignature);

        return new SuccessResponse('Payment successful', null).send();
    }),

    // get by user id

    checkoutSession: {
        getByPlan: tryCatchWrapper(async function ({ user, contextParams }: ControllerProps<ParamsPlan>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { plan } = params;

            const session = await stripeService.checkoutSession.getByPlan(plan, { userId: user.id, email: user.email ?? '' });

            return new SuccessResponse<Stripe.Checkout.Session>('Checkout Session retrieved successfully', session).send();
        }),
    },

    invoice: {
        getManyByStripeCustomerId: tryCatchWrapper(async function ({ contextParams }: ControllerProps<ParamsStripeCustomerId>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { stripeCustomerId } = params;

            const invoices = await stripeService.invoice.getManyByStripeCustomerId(stripeCustomerId);

            return new SuccessResponse<Stripe.Invoice[]>('Invoices retrieved successfully', invoices).send();
        }),
    },

    subscription: {
        cancelById: tryCatchWrapper(async function ({ contextParams }: ControllerProps<ParamsId>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { id } = params;

            await stripeService.subscription.cancelById(id);

            return new SuccessResponse('Subscription cancelled successfully', null).send();
        }),
        resumeById: tryCatchWrapper(async function ({ contextParams }: ControllerProps<ParamsId>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { id } = params;

            await stripeService.subscription.resumeById(id);

            return new SuccessResponse('Subscription resumed successfully', null).send();
        }),
    },
};
