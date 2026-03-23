import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { mainFont } from '@/styles/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Your modern platform that help you showcase your work in a clear, visual, and compelling way | ProjectVu',
    description: 'ProjectVu is a modern platform that helps professionals showcase their work in a clear, visual, and compelling way',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cn('antialiased overflow-x-hidden text-foreground bg-muted', mainFont.className)}>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster theme="light" richColors position="top-right" />
            </body>
        </html>
    );
}
