'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { mapPaymentMethodTypeToLogo } from '@/lib/helpers/other';
import { IconCreditCard } from '@tabler/icons-react';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';
import CancelSubscriptionDialog from '../_components/cancel-subscription-dialog';
import ResumeSubscriptionDialog from '../_components/resume-subscription-dialog';
import DataCard from '@/components/dashboard-ui/data-card';
import Stripe from 'stripe';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SubBilling() {
    const { subscription } = useDashboard();
    const isCanceled = subscription?.cancel_at_period_end;
    const type = subscription?.payment_method_type as Stripe.PaymentMethod.Type;
    const brand = subscription?.card_brand;

    return (
        <>
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
            {isCanceled ? (
                <DashboardCard title="Resume subscription" description="You can resume your subscription here.">
                    <div className="flex justify-end">
                        <ResumeSubscriptionDialog />
                    </div>
                </DashboardCard>
            ) : (
                <DashboardCard title="Cancel subscription" description="You can cancel your subscription here.">
                    <div className="flex justify-end">
                        <CancelSubscriptionDialog />
                    </div>
                </DashboardCard>
            )}
        </>
    );
}
