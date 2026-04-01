import { redirect } from 'next/navigation';
import CheckoutContent from './_components/checkout-content';

type CheckoutProps = {
    searchParams: Promise<{ plan: string }>;
};

export default async function Checkout({ searchParams }: CheckoutProps) {
    const query = await searchParams;
    const plan = query?.plan;

    // redirect to subscription plan page if plan is not selected
    if (!plan) {
        redirect('/onboarding/subscription-plan');
    }

    return <CheckoutContent plan={plan} />;
}
