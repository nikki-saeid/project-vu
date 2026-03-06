import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { StepperProps } from '@/lib/types/ui';
import { Fragment } from 'react';

export default function Stepper({ stepIndex, steps }: StepperProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map((step, index) => (
                    <Fragment key={step}>
                        <BreadcrumbItem>
                            <BreadcrumbPage className={cn(stepIndex >= index ? 'text-primary' : '')}>{step}</BreadcrumbPage>
                        </BreadcrumbItem>
                        {index < steps.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
