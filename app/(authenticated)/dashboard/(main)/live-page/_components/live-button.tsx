'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { updatePageStatus } from '@/lib/api-fetcher/page-status';
import { useUser } from '@/lib/contexts/user-context';
import { Business, PageStatusEnum } from '@/lib/types/db';
import { cn } from '@/lib/utils';
import { IconChevronDown, IconCircleFilled, IconLoader } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LiveButton() {
    const [isLoading, setIsLoading] = useState(false);
    const { business, setBusiness } = useUser();
    const { page_status } = business ?? {};

    const handleStatusChange = async (newStatus: PageStatusEnum) => {
        setIsLoading(true);
        try {
            const response = (await updatePageStatus(newStatus)) as unknown as Business;
            if (response.page_status === newStatus) {
                setBusiness(response);
                toast.success('Page status updated successfully');
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to update page status');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant={page_status === 'live' ? 'success' : 'muted'} className="capitalize">
                    {isLoading ? (
                        <IconLoader className="size-4 animate-spin" />
                    ) : (
                        <IconCircleFilled
                            className={cn('size-4', page_status === 'live' ? 'text-green-500 animate-pulse' : 'text-gray-500')}
                        />
                    )}
                    {page_status}
                    <IconChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled={isLoading || page_status === 'live'} onClick={() => handleStatusChange('live')}>
                        Live
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={isLoading || page_status === 'draft'} onClick={() => handleStatusChange('draft')}>
                        Draft
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
