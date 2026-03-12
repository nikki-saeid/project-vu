import type { ReactNode } from 'react';
import type { UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';
import type { Business, Project, ProjectImage } from './db';
import type { ClassNameProp } from './common';
import type { LocationFeature } from './map';
import type { ProjectWithImages } from './api';

export type PasswordInputProps = React.ComponentProps<'input'>;

export type ImageUploadProps = {
    dropZoneProps: UseSupabaseUploadReturn;
    isLogo?: boolean;
    trigger: (props: { onClick: () => void }) => ReactNode;
};

export type ProfileAvatarProps = { badge?: ReactNode } & Partial<Pick<Business, 'logo_url' | 'name'>> & ClassNameProp;

export type ProjectCardProps = { action?: ReactNode } & Partial<Pick<Project, 'title' | 'description' | 'address'>> & {
        project_image: Partial<Pick<ProjectImage, 'image_url'>>[];
    };

export type ProjectLocationPickerProps = {
    onSearchedLocationChange: (location: LocationFeature) => void;
};

export type CardFormProps = {
    title: string;
    description: string;
    action: (id: string, isLoading: boolean) => ReactNode;
    form: (id: string, setIsLoading: (about: boolean) => void) => ReactNode;
    id: string;
};

export type ProjectFormProps = {
    onSuccess?: () => void;
    id: string;
    project?: ProjectWithImages;
    setIsLoading: (about: boolean) => void;
} & ClassNameProp;

export type NoProjectsUiProps = {
    isAction?: boolean;
};

export type DropzoneContextType = Omit<UseSupabaseUploadReturn, 'getRootProps' | 'getInputProps'>;

export type DropzoneProps = UseSupabaseUploadReturn & {
    className?: string;
};

export type BusinessFormProps = {
    onSuccess?: () => void;
    id: string;
    setIsLoading: (about: boolean) => void;
};

export type DialogFormProps = {
    title: string;
    trigger?: ReactNode;
    action: (id: string, isLoading: boolean) => ReactNode;
    form?: (id: string, setIsLoading: (about: boolean) => void) => ReactNode;
    id: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export type BusinessDeleteFormProps = {
    onSuccess?: () => void;
    id: string;
    setIsLoading: (about: boolean) => void;
};

export type ProjectDeleteFormProps = {
    onSuccess?: () => void;
    id: string;
    setIsLoading: (about: boolean) => void;
};