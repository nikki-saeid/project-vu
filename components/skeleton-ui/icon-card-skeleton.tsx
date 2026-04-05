import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function IconCardSkeleton() {
    return (
        <Card className="py-2.5">
            <CardContent className="px-2.5 flex items-center gap-2">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="w-25 h-3" />
                    <Skeleton className="w-15 h-3.5" />
                </div>
            </CardContent>
        </Card>
    );
}
