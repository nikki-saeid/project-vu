import type { DialogCoreProps } from '@/lib/types/forms';
import { IconX } from '@tabler/icons-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export default function DialogCore({ trigger, action, content, title, open, onOpenChange }: DialogCoreProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-xl p-0 z-500 overflow-hidden" showCloseButton={false}>
                <DialogHeader className="p-5 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle>{title}</DialogTitle>
                        <Button variant="outline" size="icon-sm" className="shadow-none rounded-full" onClick={() => onOpenChange(false)}>
                            <IconX />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="no-scrollbar max-h-[60vh] overflow-y-auto px-5 pb-5 pt-4 relative">{content}</div>
                <DialogFooter className="border-t p-5">{action}</DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
