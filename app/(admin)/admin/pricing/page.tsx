'use client';

import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import EmptyData from '@/components/empty-data';
import PricingPlanCard from '@/components/subscription-ui/pricing-plan-card';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useAdmin } from '@/lib/contexts/admin-context';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';
import PriceCardAction from './_components/price-card-action';
import PriceFormDialog from './_components/price-form-dialog';

export default function Pricing() {
    const { pricings } = useAdmin();
    const [active, setActive] = useState<boolean | 'all'>(true);
    const [filteredPricings, setFilteredPricings] = useState<Stripe.Price[] | undefined>(
        pricings ? pricings.filter((pricing) => active === 'all' || active === pricing.active) : undefined,
    );

    useEffect(() => {
        const handleFilter = (active: boolean | 'all') => {
            setFilteredPricings(pricings ? pricings.filter((pricing) => active === 'all' || active === pricing.active) : undefined);
        };
        handleFilter(active);
    }, [active, pricings]);

    return (
        <section>
            <DashboardSubNavbar>
                <div></div>
                <PriceFormDialog />
            </DashboardSubNavbar>
            <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">
                <P className="text-muted-foreground">Manage your pricing and subscriptions.</P>

                <ButtonGroup>
                    <Button size="sm" onClick={() => setActive(true)} variant={active === true ? 'default' : 'outline'}>
                        Active
                    </Button>
                    <Button size="sm" onClick={() => setActive(false)} variant={active === false ? 'default' : 'outline'}>
                        Deactive
                    </Button>
                    <Button size="sm" onClick={() => setActive('all')} variant={active === 'all' ? 'default' : 'outline'}>
                        All
                    </Button>
                </ButtonGroup>

                {!filteredPricings || filteredPricings.length === 0 ? (
                    <EmptyData>
                        <P>No pricing found.</P>
                    </EmptyData>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {filteredPricings
                                .filter((pricing) => active === 'all' || active === pricing.active)
                                .map((pricing) => (
                                    <PricingPlanCard
                                        key={pricing.id}
                                        recurring={{
                                            interval: pricing.recurring?.interval,
                                            interval_count: pricing.recurring?.interval_count,
                                        }}
                                        product={
                                            typeof pricing.product !== 'string' && !pricing.product.deleted
                                                ? {
                                                      name: pricing.product.name,
                                                      metadata: pricing.product.metadata,
                                                      description: pricing.product.description,
                                                  }
                                                : {
                                                      name: '',
                                                      metadata: undefined,
                                                      description: '',
                                                  }
                                        }
                                        id={pricing.metadata?.id}
                                        active={pricing.active}
                                        currency={pricing.currency}
                                        unit_amount={pricing.unit_amount}
                                        nickname={pricing.nickname}
                                        noAction={false}
                                        badge={<PriceCardAction price={pricing} />}
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
