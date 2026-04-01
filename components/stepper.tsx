import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils/classes-merge';
import { StepperProps } from '@/lib/types/ui';
import { Fragment } from 'react';
import { Button } from './ui/button';

export default function Stepper({ stepIndex, steps }: StepperProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map((step, index) => (
                    <Fragment key={step}>
                        <BreadcrumbItem>
                            <BreadcrumbPage className={cn(stepIndex >= index ? 'text-primary' : '')}>
                                <Button
                                    size="sm"
                                    variant="link"
                                    className={cn('p-0 no-underline', stepIndex === index ? 'no-underline' : '')}
                                    disabled={stepIndex < index}
                                >
                                    {step}
                                </Button>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        {index < steps.length - 1 && <BreadcrumbSeparator className="text-foreground" />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
