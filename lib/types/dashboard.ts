import type { Icon as TablerIcon } from '@tabler/icons-react';
import type { Sidebar } from '@/components/ui/sidebar';
import type { ChildrenProp, ClassNameProp } from './common';
import { LogoProps, StyledIconProps } from './ui';

type SidebarNavigationItem = { title: string; url: string; Icon: TablerIcon };

export type DashboardSidebarProps = ChildrenProp & React.ComponentProps<typeof Sidebar>;
export type DashboardSidebarGroupProps = { label?: string; data: SidebarNavigationItem[] };
export type DashboardHeaderProps = { pagesMetadata: Omit<SidebarNavigationItem, 'Icon'>[] };
export type SidebarCustomButtonProps = Omit<SidebarNavigationItem, 'Icon'> & ChildrenProp;
export type NavbarProps = LogoProps & ClassNameProp;
export type NavbarWrapperProps = ChildrenProp & ClassNameProp & NavbarProps;
export type MapWrapperProps = ChildrenProp &
    ClassNameProp & {
        isSearchable?: boolean;
        fullHeight?: boolean;
        initialViewState?: { longitude: number; latitude: number; zoom: number };
    };

export type IconCardProps = {
    label: string;
    title: string;
    StyledIconProps: StyledIconProps;
};

export type DashboardCardProps = ChildrenProp & {
    title: React.ReactNode;
    description: string;
    badge?: React.ReactNode;
};

export type DataCardProps = {
    label: string;
    description?: string;
    title: string;
    badge?: React.ReactNode;
    StyledIconProps: StyledIconProps;
};
