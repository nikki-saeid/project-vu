import { Card, CardAction, CardDescription, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function DataCardSkeleton() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardDescription className="flex items-center gap-1">
                    <Skeleton className="size-9 rounded-full" />
                    <Skeleton className="w-25 h-3" />
                </CardDescription>
                <Skeleton className="w-20 h-7" />
                <CardAction>
                    <Skeleton className="w-10 h-5" />
                </CardAction>
            </CardHeader>
            <CardFooter>
                <Skeleton className="w-full h-5" />
            </CardFooter>
        </Card>
    );
}
