'use client';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/file-upload-ui/dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUploadProps } from '@/lib/types/features';
import { useEffect, useState } from 'react';

export default function ImageUploadDialog({ dropZoneProps, trigger }: ImageUploadProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (dropZoneProps.isSuccess && open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpen(false);
        }
    }, [dropZoneProps.isSuccess, open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>{trigger({ onClick: () => setOpen(true) })}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit image</DialogTitle>
                </DialogHeader>
                <Dropzone {...dropZoneProps}>
                    <DropzoneEmptyState />
                    <DropzoneContent />
                </Dropzone>
            </DialogContent>
        </Dialog>
    );
}
