import BusinessForm from '@/components/business-ui/business-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type EditDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function EditDialog({ open, onOpenChange }: EditDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit business profile</DialogTitle>
                </DialogHeader>
                <BusinessForm onNext={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
