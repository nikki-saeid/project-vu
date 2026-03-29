import type { ReactNode } from 'react';
import type { UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';
import type { Business, Project } from './db';
import type { ClassNameProp } from './common';
import type { LocationFeature } from './map';
import type { ProjectWithLatLng } from './api';

export type PasswordInputProps = React.ComponentProps<'input'>;
export type ProfileAvatarProps = { badge?: ReactNode } & Partial<Pick<Business, 'logo_url' | 'name'>> & ClassNameProp;

// Project
export type ProjectCardProps = { action?: ReactNode } & Partial<Pick<Project, 'title' | 'description' | 'address' | 'images_urls'>>;
export type ProjectLocationPickerProps = {
    onSearchedLocationChange: (location: LocationFeature) => void;
    onEditLocation?: LocationFeature;
};
export type NoProjectsUiProps = {
    isAction?: boolean;
};

// Image
export type ImageUploadProps = {
    dropZoneProps: UseSupabaseUploadReturn;
    isLogo?: boolean;
    trigger: (props: { onClick: () => void }) => ReactNode;
};
export type DropzoneContextType = Omit<UseSupabaseUploadReturn, 'getRootProps' | 'getInputProps'>;
export type DropzoneProps = UseSupabaseUploadReturn & ClassNameProp;

// form
export type CardFormProps = {
    title: string;
    description: string;
    action: (id: string, isLoading: boolean) => ReactNode;
    form: (id: string, setIsLoading: (about: boolean) => void) => ReactNode;
    id: string;
} & ClassNameProp;
export type DialogFormProps = {
    title: string;
    trigger?: ReactNode;
    action: (id: string, isLoading: boolean) => ReactNode;
    form?: (id: string, setIsLoading: (about: boolean) => void) => ReactNode;
    id: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export type FormProps = {
    onSuccess?: () => void;
    id: string;
    setIsLoading: (about: boolean) => void;
};

export type ProjectFormProps = { project?: ProjectWithLatLng } & ClassNameProp & FormProps;
export type BusinessFormProps = FormProps;
export type BusinessDeleteFormProps = FormProps;
export type ProjectDeleteFormProps = FormProps;
export type AdminDisableUserFormProps = FormProps & { activate: boolean };
