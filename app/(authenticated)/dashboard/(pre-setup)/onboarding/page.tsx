'use client';
import Stepper from '@/components/stepper';
import H3 from '@/components/typography/H3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { USER_ONBOARDING_STEPS } from '@/constants/user-dashboard';
import { useState } from 'react';
import ProfileStep from './_components/profile-step';

export default function Onboarding() {
    const [step, setStep] = useState(0);
    return (
        <div className="p-4 md:p-6 gap-4 md:gap-6 flex flex-col">
            <Stepper stepIndex={step} steps={USER_ONBOARDING_STEPS.map((item) => item.title)} />
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <H3 className="text-primary">{USER_ONBOARDING_STEPS[step].title}</H3>
                    </CardTitle>
                    <CardDescription>{USER_ONBOARDING_STEPS[step].description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileStep></ProfileStep>
                </CardContent>
            </Card>
        </div>
    );
}
