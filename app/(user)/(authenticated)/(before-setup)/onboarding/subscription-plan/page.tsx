'use client';
import CardLayouts from '@/components/card-layouts';
import PricingPlanCard from '@/components/pricing-plan-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SubscriptionPlan() {
    const searchParams = useSearchParams();
    const planQuery = searchParams.get('plan') ?? PRICING_PLANS[0].id;

    const [plan, setPlan] = useState<string>(planQuery);
    const handleChange = (value: string) => {
        setPlan(value);
    };

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
                <Tabs value={plan} onValueChange={handleChange} defaultValue={PRICING_PLANS[0].id}>
                    <TabsList className="mb-3 w-full text-secondary-foreground bg-secondary/30">
                        {PRICING_PLANS.map((plan) => (
                            <TabsTrigger key={plan.id} value={plan.id}>
                                {plan.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {PRICING_PLANS.map((plan) => (
                        <TabsContent forceMount key={plan.id} value={plan.id} className="data-[state=inactive]:hidden">
                            <PricingPlanCard noAction key={plan.id} {...plan} />
                        </TabsContent>
                    ))}
                </Tabs>
            </CardLayouts>
        </>
    );
}
