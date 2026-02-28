import type { ReactNode } from 'react';
import type { ChildrenProp } from './common';
import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Sidebar } from '@/components/ui/sidebar';

export type PasswordInputProps = React.ComponentProps<'input'>;
export type DashboardSidebarProps = ChildrenProp & React.ComponentProps<typeof Sidebar>;
export type DashboardLayoutProps = ChildrenProp & { sidebarContent?: ReactNode };
export type DashboardSidebarGroupProps = { label?: string; data: { title: string; url: string; Icon: TablerIcon }[] };
