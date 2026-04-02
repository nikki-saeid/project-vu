import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IconAlertTriangle } from '@tabler/icons-react';

type WarningAlertProps = {
    title: string;
    description: string;
};

export default function WarningAlert({ title, description }: WarningAlertProps) {
    return (
        <Alert className="border-amber-200 bg-amber-50 text-amber-800 flex items-center gap-2">
            <IconAlertTriangle />
            <div className="flex-1">
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription className="text-amber-800">{description}</AlertDescription>
            </div>
        </Alert>
    );
}
