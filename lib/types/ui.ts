import type { Icon } from '@tabler/icons-react';
import type { ChildrenProp, ClassNameProp, IsWhiteProp } from './common';

export type LogoProps = IsWhiteProp & { variant?: 'icon' | 'full' | 'black' };
export type ContainerProps = ChildrenProp & ClassNameProp;
export type StyledIconProps = ClassNameProp & { IconProps?: ClassNameProp; Icon: Icon };
export type StepperProps = { stepIndex: number; steps: string[] };
export type PricingPlanProps = {
    id: 'monthly' | 'six_month' | 'annual';
    name: string;
    price: number;
    billing: string;
    priceLabel: string;
    description: string;
    benefits: string[];
    savings: string | null;
    cta: string;
    highlight: boolean;
    ctaVariant: 'default' | 'outline' | 'outlinePrimary';
};

export type Plan = {
    plan: string;
    price: string;
    billing: string;
    description: string;
    benefits: string[];
    savings: string;
};
