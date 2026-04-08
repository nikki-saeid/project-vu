'use client';

import Navbar from '@/components/public-pages-ui/navbar';
import Container from '@/components/ui/container';
import type { ChildrenProp } from '@/lib/types/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MainLayout({ children }: ChildrenProp) {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col md:gap-6 gap-4 min-h-screen min-w-screen  overflow-x-hidden bg-background pb-4 md:pb-6">
                <Navbar variant="black" />
                <Container>{children}</Container>
            </div>
        </QueryClientProvider>
    );
}
