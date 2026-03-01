import { Sidebar } from '@/components/ui/sidebar';
import type { Icon as TablerIcon } from '@tabler/icons-react';
import type { ChildrenProp } from './common';

type SidebarNavigationItem = { title: string; url: string; Icon: TablerIcon };
export type PasswordInputProps = React.ComponentProps<'input'>;
export type DashboardSidebarProps = ChildrenProp & React.ComponentProps<typeof Sidebar>;
export type DashboardSidebarGroupProps = { label?: string; data: SidebarNavigationItem[] };
export type DashboardHeaderProps = { pagesMetadata: Omit<SidebarNavigationItem, 'Icon'>[] };
export type SidebarCustomButtonProps = Omit<SidebarNavigationItem, 'Icon'> & ChildrenProp;
