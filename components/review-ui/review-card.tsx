import { Card, CardContent } from '@/components/ui/card';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { AvatarFallback, Avatar } from '../ui/avatar';
import { Review } from '@/lib/types/db';
import P from '../typography/P';
import { Separator } from '../ui/separator';
import { timeAgo } from '@/lib/helpers/other';

export default function ReviewCard({ name, comment, rate, summary, created_at }: Partial<Review>) {
    return (
        <Card className="py-2.5">
            <CardContent className="px-2.5 flex gap-3">
                <Avatar>
                    <AvatarFallback className="uppercase">{name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <P className="text-sm font-medium">{name}</P>
                            {created_at && (
                                <>
                                    <Separator orientation="vertical" style={{ height: '10px' }} />
                                    <P className="text-xs text-muted-foreground">{timeAgo(created_at)}</P>
                                </>
                            )}
                        </div>
                        {rate && (
                            <div className="flex items-center gap-1 text-xs">
                                {Array(rate)
                                    .fill(0)
                                    .map((_, i) => (
                                        <IconStarFilled key={i} className="size-3 text-yellow-500" />
                                    ))}
                                {Array(5 - rate)
                                    .fill(0)
                                    .map((_, i) => (
                                        <IconStar key={i} className="size-3 text-yellow-500" />
                                    ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <P className="text-sm font-medium">{summary}</P>
                        <P className="text-sm font-light">{comment}</P>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
