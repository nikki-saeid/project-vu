'use client';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StripeCheckoutLineItem } from '@stripe/stripe-js';

type CheckoutDetailsProps = {
    details: StripeCheckoutLineItem;
};

export default function CheckoutDetails({ details }: CheckoutDetailsProps) {
    const { name, total, recurring, description, quantity, unitAmount } = details;

    const interval = recurring?.intervalCount === 1 ? recurring?.interval : `${recurring?.intervalCount} ${recurring?.interval}s`;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <P className="text-muted-foreground font-medium">Subsctibe to {name}</P>
                <H2>
                    {total.amount} <span className="text-muted-foreground font-medium text-sm">per {interval}</span>
                </H2>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <P className="">{name}</P>
                    <P className="">{total.amount}</P>
                </div>
                <P className="text-xs text-muted-foreground">{description}</P>
                <div className="flex justify-between">
                    <P className="text-xs text-muted-foreground">
                        Qty {quantity}, Billed every {interval}
                    </P>
                    <P className="text-xs text-muted-foreground">{unitAmount.amount} per month</P>
                </div>
            </div>

            <Separator />

            <div className="flex justify-between">
                <P className="">Total</P>
                <P className="text-md font-medium">{total.amount}</P>
            </div>
        </div>
    );
}
