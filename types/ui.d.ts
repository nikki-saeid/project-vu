import { LucideIcon } from 'lucide-react';
import type { ChildrenProp, ClassNameProp, IsWhiteProp } from './common';

export type LogoProps = IsWhiteProp & ClassNameProp & { variant?: 'icon' | 'full' };
export type ContainerProps = ChildrenProp & ClassNameProp;
export type LucideIconProps = { Icon: LucideIcon; color?: 'primary' | 'secondary' | 'success'; size?: 'sm' | 'lg' };
