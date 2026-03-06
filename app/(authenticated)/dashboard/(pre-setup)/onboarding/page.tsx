'use client';
import BusinessForm from '@/components/business-ui/business-form';
import Stepper from '@/components/stepper';
import H3 from '@/components/typography/H3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle>
                        <H3 className="text-primary">{USER_ONBOARDING_STEPS[stepIndex].title}</H3>
                    </CardTitle>
                    <CardDescription>{USER_ONBOARDING_STEPS[stepIndex].description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {stepIndex === 0 && <BusinessForm onNext={handleNext} />}
                    {/* {stepIndex === 1 && <SubscriptionPlanForm />} */}
                </CardContent>
            </Card>
        </div>
    );
}
