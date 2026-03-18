'use client';

import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import EmptyData from '@/components/empty-data';
import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    React.useEffect(() => {
        // Keep the log for debugging/monitoring (Sentry, etc.)
        console.error(error);
    }, [error]);

    return (
        // <main className="min-h-[70vh] w-full px-4 py-14">
        //     <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
        //         <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        //             <h1 className="text-balance text-xl font-semibold tracking-tight">Something went wrong</h1>
        //             <p className="mt-2 text-sm text-muted-foreground">An unexpected error occurred. You can try again, or go back home.</p>

        //             {process.env.NODE_ENV !== 'production' ? (
        //                 <div className="mt-4 rounded-md bg-muted p-3">
        //                     <p className="text-xs font-medium">Debug details</p>
        //                     <p className="mt-1 wrap-break-word font-mono text-xs text-muted-foreground">
        //                         {error?.message || 'Unknown error'}
        //                         {error?.digest ? ` (digest: ${error.digest})` : ''}
        //                     </p>
        //                 </div>
        //             ) : null}

        //             <div className="mt-6 flex flex-wrap gap-2">
        //                 <Button onClick={reset}>Try again</Button>
        //                 <Button asChild variant="outline">
        //                     <Link href="/">Go home</Link>
        //                 </Button>
        //             </div>
        //         </div>
        //     </div>
        // </main>

        <div className="min-h-screen  bg-background flex flex-col gap-4 md:gap-6 items-center justify-center">
            <EmptyData className="flex min-w-sm flex-col gap-2">
                {/* {process.env.NODE_ENV === 'production' ? (
                    <>
                        <H1 className="text-7xl">Error</H1>
                        <P className="text-muted-foreground">Somthing went wrong</P>
                    </>
                ) : (
                    <>
                        <H1 className="text-7xl">{error.name}</H1>

                        <P className="text-muted-foreground">{error.message}</P>
                    </>
                )} */}
                <>
                    <H1 className="text-7xl">{error.name}</H1>

                    <P className="text-muted-foreground">{error.message}</P>
                </>
            </EmptyData>
            <Button asChild variant="outline">
                <Link href="/">Take me back</Link>
            </Button>
        </div>
    );
}
