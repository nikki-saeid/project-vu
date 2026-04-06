import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate, tryCatchWrapperPublic } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate, ControllerPropsPublic, ParamsId, ParamsPlan, ParamsStripeCustomerId } from '@/lib/types/api';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripeService } from '../services/stripe.service';

export const stripeController = {
    // webhook
    webhook: tryCatchWrapperPublic(async function ({ req }: ControllerPropsPublic) {
        // Get the project id
        const requestBuffer = await req.text();
        const stripeSignature = (await headers()).get('stripe-signature')!;

        await stripeService.webhook(requestBuffer, stripeSignature);

        return new SuccessResponse('Payment successful', null).send();
    }),

    // get by user id

    checkoutSession: {
        getByPlan: tryCatchWrapperPrivate(async function ({ user, contextParams }: ControllerPropsPrivate<ParamsPlan>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { plan } = params;

            const session = await stripeService.checkoutSession.getByPlan(plan, { userId: user.id, email: user.email ?? '' });

            return new SuccessResponse<Stripe.Checkout.Session>('Checkout Session retrieved successfully', session).send();
        }),
    },

    invoice: {
        getManyByStripeCustomerId: tryCatchWrapperPrivate(async function ({
            contextParams,
        }: ControllerPropsPrivate<ParamsStripeCustomerId>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { stripeCustomerId } = params;

            const invoices = await stripeService.invoice.getManyByStripeCustomerId(stripeCustomerId);

            return new SuccessResponse<Stripe.Invoice[]>('Invoices retrieved successfully', invoices).send();
        }),
    },

    subscription: {
        cancelById: tryCatchWrapperPrivate(async function ({ contextParams }: ControllerPropsPrivate<ParamsId>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { id } = params;

            await stripeService.subscription.cancelById(id);

            return new SuccessResponse('Subscription cancelled successfully', null).send();
        }),
        resumeById: tryCatchWrapperPrivate(async function ({ contextParams }: ControllerPropsPrivate<ParamsId>) {
            // Get the project id
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { id } = params;

            await stripeService.subscription.resumeById(id);

            return new SuccessResponse('Subscription resumed successfully', null).send();
        }),
    },
};
