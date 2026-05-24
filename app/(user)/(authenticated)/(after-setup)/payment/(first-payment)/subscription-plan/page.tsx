'use client';

import BackButton from '@/components/back-button';
import CardLayouts from '@/components/card-layouts';
import PricingPlanTabs from '@/components/subscription-ui/pricing-plan-tabs';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/contexts/user-context';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SubscriptionPlan() {
    const searchParams = useSearchParams();
    const { pricings } = useUser();
    const planQuery = searchParams.get('plan');
    const sortedPricings = pricings ? pricings.sort((a, b) => (b.unit_amount ?? 0) - (a.unit_amount ?? 0)) : [];
    const [plan, setPlan] = useState<string>(planQuery ?? sortedPricings[0].id ?? '');

    return (
        <CardLayouts
            action={
                <div className="flex justify-between w-full">
                    <BackButton isIcon={false} />
                    <Link href={`/payment/checkout?plan=${plan}`}>
                        <Button size="sm" type="submit">
                            Proceed to payment
                        </Button>
                    </Link>
                </div>
            }
            title="Subscription plan"
            description="Select a subscription plan to get started. You can change your plan at any time."
        >
            <PricingPlanTabs plan={plan} setPlan={setPlan} pricings={sortedPricings} />
        </CardLayouts>
    );
}
