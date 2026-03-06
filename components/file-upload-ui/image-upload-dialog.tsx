'use client';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/file-upload-ui/dropzone';
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
                <Dropzone {...dropZoneProps}>
                    {dropZoneProps.files.length < dropZoneProps.maxFiles && <DropzoneEmptyState />}
                    <DropzoneContent onChooseImage={() => setOpen(false)} />
                </Dropzone>
            </DialogContent>
        </Dialog>
    );
}
