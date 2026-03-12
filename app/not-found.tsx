import EmptyData from '@/components/empty-data';
import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col gap-4 md:gap-6 items-center justify-center">
            <EmptyData className="flex flex-col gap-2">
                <H1 className="text-7xl">404</H1>
                <P className="text-muted-foreground">The page you are looking for does not exist.</P>
            </EmptyData>
            <Button asChild variant="outline">
                <Link href="/">Take me back</Link>
            </Button>
        </div>
    );
}
