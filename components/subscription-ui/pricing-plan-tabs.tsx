'use client';

import PricingPlanCard from '@/components/subscription-ui/pricing-plan-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';

type PricingPlanTabsProps = {
    plan: string;
    setPlan: (plan: string) => void;
};

export default function PricingPlanTabs({ plan, setPlan }: PricingPlanTabsProps) {
    const handleChange = (value: string) => {
        setPlan(value);
    };

    return (
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
    );
}
