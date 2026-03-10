import type { Icon as TablerIcon } from '@tabler/icons-react';
import type { Sidebar } from '@/components/ui/sidebar';
import type { ChildrenProp, ClassNameProp } from './common';

type SidebarNavigationItem = { title: string; url: string; Icon: TablerIcon };

export type DashboardSidebarProps = ChildrenProp & React.ComponentProps<typeof Sidebar>;
export type DashboardSidebarGroupProps = { label?: string; data: SidebarNavigationItem[] };
export type DashboardHeaderProps = { pagesMetadata: Omit<SidebarNavigationItem, 'Icon'>[] };
export type SidebarCustomButtonProps = Omit<SidebarNavigationItem, 'Icon'> & ChildrenProp;
export type NavbarWrapperProps = ChildrenProp & ClassNameProp;
export type MapWrapperProps = ChildrenProp & ClassNameProp & { isSearchable?: boolean; fullHeight?: boolean };

