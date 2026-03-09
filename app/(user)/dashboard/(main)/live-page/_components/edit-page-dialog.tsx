import BusinessForm from '@/components/business-ui/business-form';
import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';

type EditPageDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function EditPageDialog({ open, onOpenChange }: EditPageDialogProps) {
    return (
        <DialogForm
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Saving profile...' : 'Save profile'}
                </Button>
            )}
            id="add-project"
            form={(id, setIsLoading) => <BusinessForm id={id} setIsLoading={setIsLoading} onSuccess={() => onOpenChange(false)} />}
            title="Add Project"
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}
