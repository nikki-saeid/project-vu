import { Icon } from '@tabler/icons-react';
import type { ChildrenProp, ClassNameProp, IsWhiteProp } from './common';

export type LogoProps = IsWhiteProp & ClassNameProp & { variant?: 'icon' | 'full' };
export type ContainerProps = ChildrenProp & ClassNameProp;
export type StyledIconProps = ClassNameProp & { IconProps?: ClassNameProp; Icon: Icon };
export type StepperProps = { stepIndex: number; steps: string[] };
