'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import DataCard from '@/components/dashboard-ui/data-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import { Button } from '@/components/ui/button';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { mapPaymentMethodTypeToLogo } from '@/lib/helpers/other';
import { IconCreditCard, IconCurrencyDollarAustralian, IconRefresh, IconSparkles } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';
import { toast } from 'sonner';
import Stripe from 'stripe';
import InvoiceHistory from './_components/invoice-history';
import SubscriptionMoreMenu from './_components/subscription-more-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function Billing() {
    const { subscription, price, business } = useDashboard();
    const invoiceEndDate = subscription?.current_period_end
        ? format(new Date(subscription.current_period_end), DATE_FORMATS.dateWithTime)
        : '-';
    const id = subscription?.stripe_customer_id;
    const type = subscription?.payment_method_type as Stripe.PaymentMethod.Type;
    const brand = subscription?.card_brand;

    // ----------

    const handleCardTitle = () => {
        if (type === 'card') {
            return `****${subscription?.card_last4 ?? ''}`;
        } else if (type === 'link') {
            return (business?.email ?? '').slice(0, 3) + '****' + (business?.email ?? '').split('@')[1];
        }
        return 'Unknown';
    };
    const cardTitle = handleCardTitle();

    const handleCardLogo = () => {
        if (type === 'link') {
            return (
                <Avatar className="size-12.5 rounded-none">
                    <AvatarImage src="/payment-method/link.svg" />
                </Avatar>
            );
        }
        return <PaymentIcon type={mapPaymentMethodTypeToLogo(type, brand)} format="logo" width={50} />;
    };
    const cardLogo = handleCardLogo();

    // -----------
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const cardUpdated = searchParams.get('card_updated') === 'success';

    useEffect(() => {
        if (cardUpdated) {
            toast.dismiss();
            toast.success('Payment method updated successfully!', {
                duration: 3000,
                onDismiss: () => {
                    router.replace(pathname);
                },
                onAutoClose: () => {
                    router.replace(pathname);
                },
            });
        }
    }, [pathname, cardUpdated, router]);

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
                        title={price?.nickname ?? '-'}
                    />
                    <IconCard
                        StyledIconProps={{
                            Icon: IconCurrencyDollarAustralian,
                        }}
                        label="Fees"
                        title={`${(price?.unit_amount ?? 0) / 100}/month`}
                    />
                    <IconCard
                        StyledIconProps={{
                            Icon: IconRefresh,
                        }}
                        label="Your plan renews"
                        title={invoiceEndDate ?? '-'}
                    />
                </div>
            </DashboardCard>

            {subscription && (
                <DashboardCard title="Payment Method" description="You can see and update your payment method here.">
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
                        <DataCard
                            label="Payment Method"
                            description="This is the payment method that will be charged for your subscription. You can update it anytime."
                            title={cardTitle}
                            badge={cardLogo}
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
