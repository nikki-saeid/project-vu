import BusinessProfile from '@/components/business-ui/business-profile';
import { Card } from '@/components/ui/card';
import Container from '@/components/ui/container';

export default function Onboarding() {
    return (
        <Container>
            <div className="gap-4 md:gap-6 flex flex-col">
                {/* <Stepper stepIndex={step} steps={USER_ONBOARDING_STEPS.map((item) => item.title)} /> */}

                <Card className="border-0 shadow-none">
                    <BusinessProfile />
                </Card>
            </div>
        </Container>
    );
}
