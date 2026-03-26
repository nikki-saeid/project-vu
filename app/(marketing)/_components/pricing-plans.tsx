import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import PricingPlanCard from './pricing-plan-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SectionHeader from './section-header';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import Container from '@/components/ui/container';

export default function PricingPlans() {
    return (
        <Container>
            <div className="flex flex-col gap-4" id={SECTIONS_IDS.pricing}>
                <SectionHeader label="PRICING" />
                <div className="gap-4 lg:flex hidden">
                    {PRICING_PLANS.map((plan) => (
                        <PricingPlanCard key={plan.id} {...plan} />
                    ))}
                </div>
                <div className="lg:hidden block max-w-sm mx-auto">
                    <Tabs defaultValue={PRICING_PLANS[0].id}>
                        <TabsList className="mb-3 w-full">
                            {PRICING_PLANS.map((plan) => (
                                <TabsTrigger key={plan.id} value={plan.id}>
                                    {plan.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {PRICING_PLANS.map((plan) => (
                            <TabsContent forceMount key={plan.id} value={plan.id} className="data-[state=inactive]:hidden">
                                <PricingPlanCard key={plan.id} {...plan} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </Container>
    );
}
