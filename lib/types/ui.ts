import type { Icon } from '@tabler/icons-react';
import type { ChildrenProp, ClassNameProp, IsWhiteProp } from './common';

export type LogoProps = IsWhiteProp & { variant?: 'icon' | 'no-link'; isPng?: boolean } & { size?: '2xs' | 'sm' | 'md' };
export type ContainerProps = ChildrenProp & ClassNameProp;
export type StyledIconProps = ClassNameProp & { IconProps?: ClassNameProp; Icon: Icon };
