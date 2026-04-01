'use client';

import BusinessForm from '@/components/business-ui/business-form';
import CardForm from '@/components/card-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BusinessProfile() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/onboarding/subscription-plan');
    };

    return (
        <CardForm
            action={(id, isLoading) => (
                <Button size="sm" type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Saving profile...' : 'Save profile and continue'}
                </Button>
            )}
            id="business"
            form={(id, setIsLoading) => <BusinessForm onSuccess={handleNext} id={id} setIsLoading={setIsLoading} />}
            title="Business details"
            description="Provide your business information. These details will be visible on your public profile."
        />
    );
}
