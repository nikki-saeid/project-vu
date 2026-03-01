import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import type { DashboardSidebarGroupProps } from '@/types/features';
import Link from 'next/link';
import SidebarCustomButton from './sidebar-custom-button';

export default function DashboardSidebarGroup({ data, label }: DashboardSidebarGroupProps) {
    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={item.url} className="w-full">
                                <SidebarCustomButton title={item.title} url={item.url}>
                                    <item.Icon />
                                </SidebarCustomButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
