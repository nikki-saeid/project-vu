import StyledIcon from '@/components/styled-icon';
import H2 from '@/components/typography/H2';
import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { PricingPlanProps } from '@/lib/types/ui';
import { IconCheck } from '@tabler/icons-react';

export default function PricingPlanCard({
    id,
    name,
    price,
    billing,
    priceLabel,
    description,
    benefits,
    savings,
    cta,
    highlight,
    ctaVariant,
}: PricingPlanProps) {
    return (
        <Card className="w-full  shadow-none">
            <CardContent>
                <div className="flex items-center gap-3 mb-7 ">
                    <P className="text-lg">{name}</P>
                    {savings && <Badge className="bg-green-500 text-white">{savings}</Badge>}
                </div>
                <div className="flex items-end gap-2 mb-4">
                    <H2 className="font-bold leading-6">{priceLabel}</H2>
                    <span className="font-light text-md leading-4">/month</span>
                </div>
                <P className="text-sm mb-5 font-bold">{billing}</P>
                <div className="md:h-23 md:mb-0 mb-6">
                    <P className="text-md leading-6 ">{description}</P>
                </div>
                <Button variant={ctaVariant} className="w-full">
                    {cta}
                </Button>
                <Separator className="my-6" />
                <div className="flex flex-col gap-4">
                    {benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                            <StyledIcon Icon={IconCheck} className="bg-primary/5 size-6" IconProps={{ className: 'text-primary size-3' }} />
                            <P className="text-md">{benefit}</P>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
