'use client';

import { createContext, useCallback, useContext, type PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { type UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';
import type { DropzoneProps } from '@/lib/types/forms';
import { cn } from '@/lib/utils/classes-merge';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { Avatar, AvatarImage } from '../ui/avatar';
import { ProjectImage } from '@/lib/types/db';

export const formatBytes = (bytes: number, decimals = 2, size?: 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB') => {
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (bytes === 0 || bytes === undefined) return size !== undefined ? `0 ${size}` : '0 bytes';
    const i = size !== undefined ? sizes.indexOf(size) : Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const DropzoneContext = createContext<Omit<UseSupabaseUploadReturn, 'getRootProps' | 'getInputProps'> | undefined>(undefined);

const Dropzone = ({ className, children, getRootProps, getInputProps, ...restProps }: PropsWithChildren<DropzoneProps>) => {
    // const isSuccess = restProps.isSuccess;
    const isActive = restProps.isDragActive;
    const isInvalid =
        (restProps.isDragActive && restProps.isDragReject) ||
        restProps.errors.length > 0 ||
        restProps.files.some((file) => file.errors.length !== 0);

    return (
        <DropzoneContext.Provider value={{ ...restProps }}>
            <div
                {...getRootProps({
                    className: cn(
                        'border-2 border-gray-300 rounded-lg p-6 text-center bg-card transition-colors duration-300 text-foreground',
                        className,
                        'border-dashed',
                        isActive && 'border-primary bg-primary/5',
                        isInvalid && 'border-destructive bg-destructive/10',
                    ),
                })}
            >
                <input {...getInputProps()} />
                {children}
            </div>
        </DropzoneContext.Provider>
    );
};
const DropzoneContent = ({
    className,
    onChooseImage,
    isLogo = false,
}: {
    className?: string;
    onChooseImage?: () => void;
    isLogo?: boolean;
}) => {
    const { files, setFiles, maxFileSize, maxFiles } = useDropzoneContext();

    const exceedMaxFiles = files.length > maxFiles;

    const handleRemoveFile = useCallback(
        (fileName: string) => {
            setFiles(files.filter((file) => file.name !== fileName));
        },
        [files, setFiles],
    );

    return (
        <div className={cn('flex flex-col', className)}>
            {files.map((file, idx) => {
                return (
                    <div key={`${file.name}-${idx}`} className="flex flex-col">
                        <div className="flex items-center justify-between gap-x-4  py-2 first:mt-4 last:mb-4 ">
                            {file.type.startsWith('image/') ? (
                                <>
                                    {isLogo ? (
                                        <Avatar className="size-35 rounded-full border">
                                            <AvatarImage src={file.preview} alt={file.name} className="object-cover" />
                                        </Avatar>
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            className="border aspect-video h-50 object-cover rounded-lg"
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center">
                                    <IconPhoto size={18} />
                                </div>
                            )}

                            <Button size="icon-xs" variant="outline" className="rounded-full" onClick={() => handleRemoveFile(file.name)}>
                                <IconX />
                            </Button>
                        </div>
                        <div className="shrink grow flex flex-col items-start truncate">
                            <p title={file.name} className="text-sm truncate max-w-full text-wrap text-left">
                                {file.name.length > 50 ? file.name.slice(0, 50) + '...' : file.name}
                            </p>
                            {file.errors.length > 0 ? (
                                <p className="text-xs text-destructive text-wrap text-left">
                                    {file.errors
                                        .map((e) =>
                                            e.message.startsWith('File is larger than')
                                                ? `File is larger than ${formatBytes(maxFileSize, 2)} (Size: ${formatBytes(file.size, 2)})`
                                                : e.message,
                                        )
                                        .join(', ')}
                                </p>
                            ) : (
                                <p className="text-xs text-muted-foreground">{formatBytes(file.size, 2)}</p>
                            )}
                        </div>
                    </div>
                );
            })}
            {exceedMaxFiles && (
                <p className="text-sm text-left mt-2 text-destructive">
                    You may upload only up to {maxFiles} files, please remove {files.length - maxFiles} file
                    {files.length - maxFiles > 1 ? 's' : ''}.
                </p>
            )}
            {isLogo && files.length > 0 && !exceedMaxFiles && (
                <div className="mt-2">
                    <Button variant="outline" disabled={files.some((file) => file.errors.length !== 0)} onClick={onChooseImage}>
                        Choose image
                    </Button>
                </div>
            )}
        </div>
    );
};

const DropzoneEmptyState = ({ className }: { className?: string }) => {
    const { maxFiles, maxFileSize, inputRef } = useDropzoneContext();

    return (
        <div className={cn('flex flex-col items-center gap-y-2', className)}>
            <IconUpload size={20} className="text-muted-foreground" />
            <p className="text-sm">
                Upload {!!maxFiles && maxFiles > 1 ? `up to ${maxFiles}` : ''} file
                {!maxFiles || maxFiles > 1 ? 's' : ''}
            </p>
            <div className="flex flex-col items-center gap-y-1">
                <p className="text-xs text-muted-foreground">
                    Drag and drop or{' '}
                    <a onClick={() => inputRef.current?.click()} className="underline cursor-pointer transition hover:text-foreground">
                        select {maxFiles === 1 ? `file` : 'files'}
                    </a>{' '}
                    to upload
                </p>
                {maxFileSize !== Number.POSITIVE_INFINITY && (
                    <p className="text-xs text-muted-foreground">Maximum file size: {formatBytes(maxFileSize, 2)}</p>
                )}
            </div>
        </div>
    );
};

const useDropzoneContext = () => {
    const context = useContext(DropzoneContext);

    if (!context) {
        throw new Error('useDropzoneContext must be used within a Dropzone');
    }

    return context;
};

export { Dropzone, DropzoneContent, DropzoneEmptyState, useDropzoneContext };
