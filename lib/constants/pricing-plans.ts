import type { PricingPlanProps } from '../types/ui';

export const PRICING_PLANS_IDS = {
    monthly: 'monthly',
    six_month: 'six_month',
    annual: 'annual',
} as const;

export const PRICING_PLANS: PricingPlanProps[] = [
    {
        id: PRICING_PLANS_IDS.monthly,
        name: 'Monthly',
        price: 18.95,
        billing: 'Billed monthly',
        priceLabel: '$18.95',
        description: 'Flexible, cancel anytime. Perfect for trying ProjectVu without commitment.',
        benefits: ['Full access to your shareable profile', 'Map and list views of projects', 'Project photos and details'],
        savings: null,
        cta: 'Start Monthly',
        ctaVariant: 'outlinePrimary',
        highlight: false,
    },
    {
        id: PRICING_PLANS_IDS.six_month,
        name: '6 Month',
        price: 14.95,
        billing: 'Billed every 6 months ($89.70 upfront)',
        priceLabel: '$14.95',
        description: 'Ideal for professionals who want consistent visibility and savings.',
        benefits: ['Full access to your shareable profile', 'Map and list views of projects', 'Project photos and details'],
        savings: 'Save ~21%',
        cta: 'Start for 6 Month',
        ctaVariant: 'outlinePrimary',
        highlight: false,
    },
    {
        id: PRICING_PLANS_IDS.annual,
        name: 'Annual',
        price: 11.95,
        billing: 'Billed yearly ($143.40 upfront)',
        priceLabel: '$11.95',
        description: 'Best value for long-term users. Lock in your early-adopter rate and enjoy uninterrupted access.',
        benefits: ['Full access to your shareable profile', 'Map and list views of projects', 'Project photos and details'],
        savings: 'Save ~37%',
        cta: 'Start Annual',
        ctaVariant: 'default',
        highlight: true,
    },
];
