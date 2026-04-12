'use client';

import ImageUpload from '@/components/file-upload-ui/image-upload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { ImageUploadProps } from '@/lib/types/forms';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ImageUploadDialog({ dropZoneProps, trigger }: ImageUploadProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>{trigger({ onClick: () => setOpen(true) })}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl p-0" showCloseButton={false}>
                <DialogHeader className="p-5 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle>Image upload</DialogTitle>
                        <Button variant="outline" size="icon-xs" className="shadow-none rounded-full" onClick={() => setOpen(false)}>
                            <IconX />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="no-scrollbar max-h-[60vh] overflow-y-auto px-5 pb-5 pt-1">
                    <ImageUpload dropZoneProps={dropZoneProps} onChooseImage={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
