import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { StepperProps } from '@/types/ui';

export default function Stepper({ stepIndex, steps }: StepperProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map((step, index) => (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbPage className={cn(stepIndex >= index ? 'text-primary' : '')}>{step}</BreadcrumbPage>
                        </BreadcrumbItem>
                        {index < steps.length - 1 && <BreadcrumbSeparator />}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
