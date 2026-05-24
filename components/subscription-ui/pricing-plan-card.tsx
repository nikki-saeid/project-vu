import StyledIcon from '@/components/styled-icon';
import H2 from '@/components/typography/H2';
import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PriceResponse } from '@/lib/types/api';
import { IconCheck } from '@tabler/icons-react';

type PricingPlanCardProps = PriceResponse & { noAction?: boolean; badge?: React.ReactNode };

export default function PricingPlanCard({ recurring, product, noAction = false, unit_amount, badge, id }: PricingPlanCardProps) {
    const { interval, interval_count } = recurring ?? { interval_count: 1, interval: 'month' };
    const benefits: {
        value: string;
    }[] = product?.metadata?.benefits ? JSON.parse(product?.metadata?.benefits) : [];

    const savings = product?.metadata?.saving;

    const price = unit_amount ? unit_amount / 100 : 0;
    const count = interval_count ?? 1;
    const total = (price * count * (interval === 'year' ? 12 : 1)).toFixed(2);

    return (
        <Card className="w-full  shadow-none relative">
            <CardContent>
                {badge && <div className="absolute top-2 right-2 z-10">{badge}</div>}
                <div className="flex items-center gap-3 mb-7 ">
                    <P className="text-lg">{product?.name}</P>
                    {savings && <Badge className="bg-green-500 text-white">Save ~{savings}%</Badge>}
                </div>
                <div className="flex items-end gap-2 mb-4">
                    {unit_amount && <H2 className="font-bold leading-6">{unit_amount / 100}</H2>}
                    <span className="font-light text-md leading-4">/month</span>
                </div>
                <P className="text-sm mb-5 font-bold">
                    Billed every {count > 1 ? interval_count : ''} {interval}
                    {(count > 1 || interval === 'year') && <span> (${total} upfront)</span>}
                </P>
                <div className={noAction ? 'sm:h-fit h-15' : 'h-20'}>
                    <P className="text-sm leading-5.5 ">{product?.description}</P>
                </div>

                {!noAction && <Button className="w-full">Start {product?.name}</Button>}
                <Separator className="my-6" />
                <div className="flex flex-col gap-4">
                    {Array.isArray(benefits) && (
                        <>
                            {benefits.map((benefit) => (
                                <div key={benefit.value} className="flex items-center gap-2">
                                    <StyledIcon
                                        Icon={IconCheck}
                                        className="bg-primary/5 size-6"
                                        IconProps={{ className: 'text-primary size-3' }}
                                    />
                                    <P className="text-md">{benefit.value}</P>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
