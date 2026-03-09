import { DialogFormProps } from '@/lib/types/features';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export default function DialogForm({ trigger, action, id, form, title, open, onOpenChange }: DialogFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-xl p-0" showCloseButton={false}>
                <DialogHeader className="p-5 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle>{title}</DialogTitle>
                        <Button variant="outline" size="icon-xs" className="shadow-none rounded-full" onClick={() => onOpenChange(false)}>
                            <IconX />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="no-scrollbar max-h-[60vh] overflow-y-auto p-5">{form(id, setIsLoading)}</div>
                <DialogFooter className="border-t p-5">{action(id, isLoading)}</DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
