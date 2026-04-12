import type { UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload';
import type { ReactNode } from 'react';
import type { ProjectWithLatLng } from './api';
import type { ChildrenProp, ClassNameProp } from './common';
import type { Business } from './db';
import type { LocationFeature } from './map';

export type PasswordInputProps = React.ComponentProps<'input'>;
export type ProfileAvatarProps = { badge?: ReactNode } & Partial<Pick<Business, 'logo_url' | 'name'>> & ClassNameProp;

// Project
export type ProjectCardProps = { action?: ReactNode; isPublic?: boolean } & Partial<ProjectWithLatLng> & Pick<Business, 'slug'>;
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
export type CardLayoutsProps = {
    title?: string;
    description?: string;
    action?: ReactNode;
} & ClassNameProp &
    ChildrenProp;

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
