'use client';

import * as React from 'react';
import { Drawer as RelativeDrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils/classes-merge';

function RelativeDrawer({ ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Root>) {
    return <RelativeDrawerPrimitive.Root modal={false} data-slot="drawer" {...props} />;
}

function RelativeDrawerTrigger({ ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Trigger>) {
    return <RelativeDrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function RelativeDrawerPortal({ ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Portal>) {
    return <RelativeDrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function RelativeDrawerClose({ ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Close>) {
    return <RelativeDrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function RelativeDrawerOverlay({ className, ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Overlay>) {
    return (
        <RelativeDrawerPrimitive.Overlay
            data-slot="drawer-overlay"
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 absolute inset-0 z-50 bg-black/50',
                className,
            )}
            {...props}
        />
    );
}

function RelativeDrawerContent({
    className,
    children,
    action,
    ...props
}: React.ComponentProps<typeof RelativeDrawerPrimitive.Content> & { action?: React.ReactNode }) {
    return (
        <>
            <RelativeDrawerOverlay />
            <RelativeDrawerPrimitive.Content
                data-slot="drawer-content"
                className={cn(
                    'group/drawer-content bg-background absolute z-50 flex h-auto flex-col pt-3 px-3',
                    'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg ',
                    'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg',
                    'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm',
                    'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4  data-[vaul-drawer-direction=left]:sm:max-w-sm',
                    className,
                )}
                {...props}
            >
                {action && <div className="flex justify-end mb-3">{action}</div>}

                {children}
            </RelativeDrawerPrimitive.Content>
        </>
    );
}

function RelativeDrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="drawer-header"
            className={cn(
                'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
                className,
            )}
            {...props}
        />
    );
}

function RelativeDrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}

function RelativeDrawerTitle({ className, ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Title>) {
    return <RelativeDrawerPrimitive.Title data-slot="drawer-title" className={cn('text-foreground font-semibold', className)} {...props} />;
}

function RelativeDrawerDescription({ className, ...props }: React.ComponentProps<typeof RelativeDrawerPrimitive.Description>) {
    return (
        <RelativeDrawerPrimitive.Description
            data-slot="drawer-description"
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    );
}

export {
    RelativeDrawer,
    RelativeDrawerPortal,
    RelativeDrawerOverlay,
    RelativeDrawerTrigger,
    RelativeDrawerClose,
    RelativeDrawerContent,
    RelativeDrawerHeader,
    RelativeDrawerFooter,
    RelativeDrawerTitle,
    RelativeDrawerDescription,
};
