'use client';

import ImageUpload from '@/components/file-upload-ui/image-upload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUploadProps } from '@/lib/types/features';
import { useState } from 'react';

export default function ImageUploadDialog({ dropZoneProps, trigger }: ImageUploadProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>{trigger({ onClick: () => setOpen(true) })}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit image</DialogTitle>
                </DialogHeader>
                <ImageUpload dropZoneProps={dropZoneProps} onChooseImage={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
