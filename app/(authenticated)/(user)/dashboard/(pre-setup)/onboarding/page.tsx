'use client';
import BusinessForm from '@/components/business-ui/business-form';
import CardForm from '@/components/card-form';
import Stepper from '@/components/stepper';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const USER_ONBOARDING_STEPS = [
    {
        title: 'Business details',
        description: 'Provide your business information. These details will be visible on your public profile.',
    },
    {
        title: 'Subscription plan',
        description: 'Select a subscription plan to get started. You can change your plan at any time.',
    },
];

export default function Onboarding() {
    const [stepIndex, setStepIndex] = useState(0);

    const handleNext = () => {
        setStepIndex(stepIndex + 1);
    };
    const handlePrevious = () => {
        setStepIndex(stepIndex - 1);
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl mx-auto">
            <Stepper stepIndex={0} steps={USER_ONBOARDING_STEPS.map((item) => item.title)} />
            {stepIndex === 0 && (
                <CardForm
                    action={(id, isLoading) => (
                        <Button type="submit" form={id} disabled={isLoading}>
                            {isLoading ? 'Saving profile...' : 'Save profile and continue'}
                        </Button>
                    )}
                    id="business"
                    form={(id, setIsLoading) => <BusinessForm onSuccess={handleNext} id={id} setIsLoading={setIsLoading} />}
                    title={USER_ONBOARDING_STEPS[0].title}
                    description={USER_ONBOARDING_STEPS[0].description}
                />
            )}
            {stepIndex === 1 && (
                <CardForm
                    action={(id, isLoading) => (
                        <Button type="submit" form={id} disabled={isLoading}>
                            {isLoading ? 'Saving profile...' : 'Save profile and continue'}
                        </Button>
                    )}
                    id="business"
                    form={(id, setIsLoading) => <>ok</>}
                    title={USER_ONBOARDING_STEPS[1].title}
                    description={USER_ONBOARDING_STEPS[1].description}
                />
            )}
        </div>
    );
}
