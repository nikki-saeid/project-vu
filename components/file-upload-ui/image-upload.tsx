import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/file-upload-ui/dropzone';
import { UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';

export default function ImageUpload({
    dropZoneProps,
    onChooseImage,
    isLogo = false,
}: {
    dropZoneProps: UseSupabaseUploadReturn;
    onChooseImage?: () => void;
    isLogo?: boolean;
}) {
    return (
        <Dropzone {...dropZoneProps}>
            {dropZoneProps.files.length < dropZoneProps.maxFiles && <DropzoneEmptyState />}
            <DropzoneContent isLogo={isLogo} onChooseImage={onChooseImage} />
        </Dropzone>
    );
}
