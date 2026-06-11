'use client';

import PricingPlanCard from '@/components/subscription-ui/pricing-plan-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PriceResponse } from '@/lib/types/api';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon12Hours } from '@tabler/icons-react';

type PricingPlanTabsProps = {
    plan: string;
    setPlan: (plan: string) => void;
    pricings: PriceResponse[];
};

export default function PricingPlanTabs({ plan, setPlan, pricings }: PricingPlanTabsProps) {
    const handleChange = (value: string) => {
        setPlan(value);
    };

    return (
        // <Tabs value={plan} onValueChange={handleChange} defaultValue={pricings[0].id}>
        //     <TabsList className="mb-3 w-full text-secondary-foreground bg-secondary/30">
        //         {pricings.map((plan) => (
        //             <TabsTrigger key={plan.id} value={plan.id}>
        //                 {plan.nickname}
        //             </TabsTrigger>
        //         ))}
        //     </TabsList>
        //     {pricings.map((plan) => (
        //         <TabsContent forceMount key={plan.id} value={plan.id} className="data-[state=inactive]:hidden">
        //             <PricingPlanCard noAction key={plan.id} {...plan} />
        //         </TabsContent>
        //     ))}
        // </Tabs>

        <Tabs value={plan} onValueChange={handleChange} defaultValue={pricings[0].id}>
            <TabsList className="mb-3 w-full text-secondary-foreground bg-secondary/30 hidden min-[500px]:flex">
                {pricings.map((plan) => (
                    <TabsTrigger key={plan.id} value={plan.id}>
                        {plan.nickname}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsList className="mb-3 w-full text-secondary-foreground bg-secondary/30 hidden max-[500px]:flex">
                <Select value={plan} onValueChange={handleChange} defaultValue={pricings[0].id}>
                    <SelectTrigger className="w-full bg-background text-foreground border-0 shadow max-h-7.5 font-medium" size="sm">
                        <SelectValue className="w-full" placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {pricings.map((plan) => (
                                <SelectItem key={plan.id} value={plan.id}>
                                    {plan.nickname}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TabsList>

            {pricings.map((plan) => (
                <TabsContent forceMount key={plan.id} value={plan.id} className="data-[state=inactive]:hidden">
                    <PricingPlanCard noAction key={plan.id} {...plan} />
                </TabsContent>
            ))}
        </Tabs>
    );
}
