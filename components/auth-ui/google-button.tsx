import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { useState } from 'react';

export default function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSocialLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/oauth?next=/protected`,
                },
            });

            if (error) throw error;
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSocialLogin}>
            <div className="flex flex-col gap-6">
                <Button variant="outline" className={cn('w-full', className)} {...props} type="submit" disabled={isLoading}>
                    <IconBrandGoogleFilled />
                    {isLoading ? 'Logging in...' : 'Continue with Google'}
                </Button>
                {error && <p className="text-sm text-destructive-500">{error}</p>}
            </div>
        </form>
    );
}
