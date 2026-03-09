import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background md:p-6 p-4">
            <Card className="min-w-sm">
                <CardHeader>
                    <CardTitle>
                        <H3>404 - Page Not Found</H3>
                    </CardTitle>
                    <CardDescription>
                        <P>The page you are looking for does not exist.</P>
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
