import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessProfileSkeleton() {
    return (
        <section>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    {/* Header: avatar + name + badge */}
                    <header className="flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-full max-w-xl" />
                        <Skeleton className="h-4 w-full max-w-lg" />
                        <Skeleton className="h-4 w-3/4 max-w-md" />
                    </header>
                    {/* Socials */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-8 w-8 rounded-full" />
                        ))}
                    </div>
                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        <Skeleton className="h-9 w-full" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                </div>
                <Separator />
                {/* Projects tabs */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-1">
                        <Skeleton className="h-9 w-28" />
                        <Skeleton className="h-9 w-28" />
                    </div>
                    <Skeleton className="aspect-video w-full h-150 min-h-[200px]" />
                </div>
            </div>
        </section>
    );
}
