import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/file-upload-ui/dropzone';
import { UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';

export default function ImageUpload({
    dropZoneProps,
    onChooseImage,
}: {
    dropZoneProps: UseSupabaseUploadReturn;
    onChooseImage?: () => void;
}) {
    const totalImages = dropZoneProps.files.length;

    return (
        <Dropzone {...dropZoneProps}>
            {totalImages < dropZoneProps.maxFiles && <DropzoneEmptyState />}
            <DropzoneContent onChooseImage={onChooseImage} />
        </Dropzone>
    );
}
