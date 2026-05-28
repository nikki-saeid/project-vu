'use client';

import PricingPlanCard from '@/components/subscription-ui/pricing-plan-card';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { useUser } from '@/lib/contexts/user-context';
import SectionHeader from './section-header';

export default function PricingPlans() {
    const { pricings } = useUser();
    if (!pricings || pricings.length === 0) return null;

    const sortedPricings = pricings.sort((a, b) => (b.unit_amount ?? 0) - (a.unit_amount ?? 0));

    return (
        <Container>
            <div className=" p-10 rounded-lg border flex flex-col md:gap-6 gap-4" id={SECTIONS_IDS.pricing}>
                <SectionHeader
                    label="PRICING"
                    description="Choose the plan that best fits your needs and budget. We offer flexible pricing options to suit your project needs."
                />
                {/* DESKTOP */}
                <div className="gap-4 lg:flex hidden">
                    {sortedPricings.map((plan) => (
                        <PricingPlanCard noAction key={plan.id} {...plan} />
                    ))}
                </div>

                {/* MOBILE */}
                <div className="lg:hidden block max-w-sm mx-auto">
                    <Tabs defaultValue={sortedPricings[0].id}>
                        <TabsList className="mb-3 w-full text-secondary-foreground bg-secondary/30">
                            {sortedPricings.map((plan) => (
                                <TabsTrigger key={plan.id} value={plan.id}>
                                    {plan.nickname}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {sortedPricings.map((plan) => (
                            <TabsContent forceMount key={plan.id} value={plan.id} className="data-[state=inactive]:hidden">
                                <PricingPlanCard noAction key={plan.id} {...plan} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </Container>
    );
}
