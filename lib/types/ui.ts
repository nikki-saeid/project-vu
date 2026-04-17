import type { Icon } from '@tabler/icons-react';
import type { ChildrenProp, ClassNameProp, IsWhiteProp } from './common';

export type LogoProps = IsWhiteProp & { variant?: 'icon' | 'full' | 'black' | 'no-icon' };
export type ContainerProps = ChildrenProp & ClassNameProp;
export type StyledIconProps = ClassNameProp & { IconProps?: ClassNameProp; Icon: Icon };
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
    noAction?: boolean;
};
