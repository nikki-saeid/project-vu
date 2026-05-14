'use client';

import CardLayouts from '@/components/card-layouts';
import PricingPlanTabs from '@/components/subscription-ui/pricing-plan-tabs';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SubscriptionPlan() {
    const searchParams = useSearchParams();
    const planQuery = searchParams.get('plan') || PRICING_PLANS[0].id;

    const [plan, setPlan] = useState<string>(planQuery);

    return (
        <>
            <CardLayouts
                action={
                    <div className="flex justify-between w-full">
                        <Link href="/onboarding/business-profile">
                            <Button size="sm" variant="outline" type="submit">
                                Back
                            </Button>
                        </Link>
                        <Link href={`/onboarding/checkout?plan=${plan}`}>
                            <Button size="sm" type="submit">
                                Proceed to payment
                            </Button>
                        </Link>
                    </div>
                }
                title="Subscription plan"
                description="Select a subscription plan to get started. You can change your plan at any time."
            >
                <PricingPlanTabs plan={plan} setPlan={setPlan} />
            </CardLayouts>
        </>
    );
}
