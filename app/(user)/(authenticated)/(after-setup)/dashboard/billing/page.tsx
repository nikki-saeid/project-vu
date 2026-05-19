'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import DataCard from '@/components/dashboard-ui/data-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import { Button } from '@/components/ui/button';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { mapPaymentMethodTypeToLogo } from '@/lib/helpers/other';
import { IconCreditCard, IconCurrencyDollarAustralian, IconRefresh, IconSparkles } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';
import InvoiceHistory from './_components/invoice-history';
import SubscriptionMoreMenu from './_components/subscription-more-menu';
import Stripe from 'stripe';

export default function Billing() {
    const { subscription } = useDashboard();
    const plan = PRICING_PLANS.find((plan) => plan.id === subscription?.plan);
    const invoiceEndDate = subscription?.current_period_end
        ? format(new Date(subscription.current_period_end), DATE_FORMATS.dateWithTime)
        : '-';
    const id = subscription?.stripe_customer_id;
    const type = subscription?.payment_method_type as Stripe.PaymentMethod.Type;
    const brand = subscription?.card_brand;

    return (
        <>
            <DashboardCard
                title="Subscription details"
                description="This is your current subscription details."
                badge={<SubscriptionMoreMenu />}
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <IconCard
                        StyledIconProps={{
                            Icon: IconSparkles,
                        }}
                        label="Plan"
                        title={plan?.name ?? ''}
                    />
                    <IconCard
                        StyledIconProps={{
                            Icon: IconCurrencyDollarAustralian,
                        }}
                        label="Fees"
                        title={`${plan?.priceLabel}/month`}
                    />
                    <IconCard
                        StyledIconProps={{
                            Icon: IconRefresh,
                        }}
                        label="Your plan renews"
                        title={invoiceEndDate}
                    />
                </div>
            </DashboardCard>

            {subscription && (
                <DashboardCard title="Payment Method" description="You can see and update your payment method here.">
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
                        <DataCard
                            label="Payment Method"
                            description="This is the payment method that will be charged for your subscription. You can update it anytime."
                            title={`*****${subscription.card_last4}`}
                            badge={<PaymentIcon type={mapPaymentMethodTypeToLogo(type, brand)} format="logo" width={50} />}
                            StyledIconProps={{
                                Icon: IconCreditCard,
                                className: 'bg-primary/5',
                                IconProps: { className: 'text-primary' },
                            }}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Link href="/payment/update-method">
                            <Button size="sm" type="button">
                                Update payment method
                            </Button>
                        </Link>
                    </div>
                </DashboardCard>
            )}

            <DashboardCard title="Invoice history" description="You can see your invoice history here.">
                {id && <InvoiceHistory stripe_customer_id={id} />}
            </DashboardCard>
        </>
    );
}
