'use client';

import { ProfileAvatarProps } from '@/lib/types/features';
import { IconPencil, IconPhoto } from '@tabler/icons-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import ImageUploadDialog from '../file-upload-ui/image-upload-dialog';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';

export default function BusinessAvatar({ logo_url, name, isEdit }: ProfileAvatarProps) {
    const dropZoneProps = useSupabaseUpload({
        bucketName: 'businesses',
        path: 'logo',
        allowedMimeTypes: ['image/*'],
        maxFiles: 1,
        maxFileSize: 1000 * 1000,
    });

    return (
        <Avatar className="relative size-24 overflow-visible flex items-center justify-center bg-muted">
            {logo_url ? (
                <AvatarImage className="rounded-full size-24 text-gray-400 object-contain" src={logo_url} alt={name ?? 'business logo'} />
            ) : (
                <IconPhoto className="size-10 text-gray-300" />
            )}

            {isEdit && (
                <div className="absolute right-1 z-10 bottom-1">
                    <ImageUploadDialog
                        dropZoneProps={dropZoneProps}
                        trigger={({ onClick }) => (
                            <Button size="icon-sm" className="shadow-none rounded-full border-0" onClick={onClick}>
                                <IconPencil />
                            </Button>
                        )}
                    />
                </div>
            )}
        </Avatar>
    );
}
