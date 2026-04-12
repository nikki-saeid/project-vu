'use client';

import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';
import { updateUserBusiness } from '@/lib/api-fetcher/user/client/business';
import { getUserAuth } from '@/lib/api-fetcher/user/server/auth';
import { BUSINESS_TYPE, PROJECT_TYPE_TAGS, SERVICE_TYPE_TAGS } from '@/lib/constants/user-dashboard';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { useUser } from '@/lib/contexts/user-context';
import type { BusinessFormProps } from '@/lib/types/forms';
import { businessProfileSchema } from '@/lib/validators/user/business-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandX,
    IconBuildings,
    IconPencil,
    IconPhone,
    IconRestore,
    IconUser,
    IconWorld
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import ImageUploadDialog from '../file-upload-ui/image-upload-dialog';
import H4 from '../typography/H4';
import P from '../typography/P';
import { Separator } from '../ui/separator';
import BusinessAvatar from './business-avatar';

export default function BusinessForm({ onSuccess, id, setIsLoading }: BusinessFormProps) {
    const { business, setBusiness } = useDashboard();
    const { setUser } = useUser();

    const form = useForm({
        resolver: zodResolver(businessProfileSchema),
        defaultValues: {
            name: business?.name ?? '',
            description: business?.description ?? '',
            type: business?.type ?? BUSINESS_TYPE[0],
            phone: business?.phone ?? '',
            service_type_tags: business?.service_type_tags ?? [],
            project_type_tags: business?.project_type_tags ?? [],
            website_url: business?.website_url ?? undefined,
            instagram_url: business?.instagram_url ?? undefined,
            facebook_url: business?.facebook_url ?? undefined,
            x_url: business?.x_url ?? undefined,
        },
    });

    // ------------------------------
    // Upload image
    // ------------------------------
    const dropZoneProps = useSupabaseUpload({
        allowedMimeTypes: ['image/*'],
        maxFiles: 1,
        maxFileSize: 1000 * 1000,
        isLogo: true,
    });
    const { errors, files } = dropZoneProps;

    // ------------------------------
    // On submit
    // ------------------------------
    const onSubmit = async (data: z.infer<typeof businessProfileSchema>) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({ ...data, slug: business?.slug }));
            if (files[0]) {
                formData.append('logo', files[0]);
            }

            const response = await updateUserBusiness(formData);
            setBusiness(response.data);

            const newUser = await getUserAuth();
            setUser(newUser);
            toast.success(response.message);
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while updating your business');
        } finally {
            setIsLoading(false);
        }
    };

    const type = form.watch('type');
    const [isOther, setIsOther] = useState(!BUSINESS_TYPE.find((item) => item === business?.type));
    const handleRestore = () => {
        form.setValue('type', business?.type ?? BUSINESS_TYPE[0]);
        setIsOther(false);
    };
    useEffect(() => {
        if (type === 'Other') {
            form.setValue('type', '');
            setIsOther(true);
        }
    }, [type, form]);

    return (
        <form className="flex flex-col gap-4 md:gap-6" id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <BusinessAvatar
                    logo_url={
                        files[0]?.preview
                            ? errors.length > 0
                                ? (business?.logo_url ?? undefined)
                                : (files[0]?.preview ?? undefined)
                            : (business?.logo_url ?? undefined)
                    }
                    badge={
                        <ImageUploadDialog
                            dropZoneProps={dropZoneProps}
                            trigger={({ onClick }) => (
                                <Button type="button" size="icon-sm" className="shadow-none rounded-full border-0" onClick={onClick}>
                                    <IconPencil />
                                </Button>
                            )}
                        />
                    }
                />

                <Controller
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-type">Business type</FieldLabel>
                            {isOther ? (
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="form-phone"
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Type a business type"
                                        autoComplete="tel"
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <Button size="icon-sm" variant="ghost" onClick={handleRestore} className="rounded-full">
                                            <IconRestore />
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            ) : (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="data-placeholder:text-[15px]">
                                        <SelectValue placeholder="Pick a business type" />
                                    </SelectTrigger>
                                    <SelectContent className="z-1000" {...field} id="project-title" aria-invalid={fieldState.invalid}>
                                        {BUSINESS_TYPE.map((year) => (
                                            <SelectItem value={year + ''} key={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-business-name">Business name</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconUser />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    id="form-business-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your business name"
                                    autoComplete="on"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconPhone />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    id="form-phone"
                                    type="tel"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="+1 (555) 000-0000"
                                    autoComplete="tel"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>
            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-description">Business bio</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                {...field}
                                id="form-description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Tell us about your business (min 10 characters)"
                                autoComplete="on"
                            />
                            <InputGroupAddon>
                                <IconBuildings />
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Separator />
            <div className="flex flex-col gap-2">
                <H4 className="text-foreground">Business tags (optional)</H4>
                <P className="text-muted-foreground">Add your tags related to your business.</P>
            </div>

            <Controller
                name="project_type_tags"
                control={form.control}
                render={({ field, fieldState }) => {
                    return (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-type">Project types</FieldLabel>
                            <Combobox
                                items={PROJECT_TYPE_TAGS}
                                value={field.value}
                                onValueChange={field.onChange}
                                name={field.name}
                                multiple
                            >
                                <ComboboxChips>
                                    <ComboboxValue>
                                        {Array.isArray(field.value) &&
                                            field.value.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)}
                                    </ComboboxValue>
                                    <ComboboxChipsInput placeholder="Select project types" />
                                </ComboboxChips>

                                {/*  ----------------------------  */}
                                <ComboboxContent className="pointer-events-auto overflow-auto min-h-50">
                                    {/* if empty */}
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>

                                    {/* if not empty */}
                                    <ComboboxList className="max-h-50 overflow-y-auto">
                                        {(item: string) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    );
                }}
            />
            <Controller
                name="service_type_tags"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-type">Service type</FieldLabel>
                        <Combobox items={SERVICE_TYPE_TAGS} value={field.value} onValueChange={field.onChange} name={field.name} multiple>
                            <ComboboxChips>
                                <ComboboxValue>
                                    {Array.isArray(field.value) &&
                                        field.value.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)}
                                </ComboboxValue>
                                <ComboboxChipsInput placeholder="Select service type" />
                            </ComboboxChips>

                            {/*  ----------------------------  */}
                            <ComboboxContent className="pointer-events-auto overflow-scroll">
                                {/* if empty */}
                                <ComboboxEmpty>No items found.</ComboboxEmpty>

                                {/* if not empty */}
                                <ComboboxList className="max-h-50 overflow-y-auto">
                                    {(item: string) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Separator />
            <div className="flex flex-col gap-2">
                <H4 className="text-foreground">Socials (optional)</H4>
                <P className="text-muted-foreground">Add your business social media links to help customers find you online.</P>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Controller
                    name="website_url"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-website">Website</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconWorld />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...(field as { value: string })}
                                    id="form-website"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://example.com"
                                    autoComplete="url"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="instagram_url"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-instagram">Instagram</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconBrandInstagram />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...(field as { value: string })}
                                    id="form-instagram"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://instagram.com/yourhandle"
                                    type="text"
                                    autoComplete="url"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="facebook_url"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-facebook">Facebook</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconBrandFacebook />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...(field as { value: string })}
                                    id="form-facebook"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://facebook.com/yourpage"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="x_url"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-x">X (Twitter)</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <IconBrandX />
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...(field as { value: string })}
                                    id="form-x"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://x.com/yourhandle"
                                    autoComplete="url"
                                />
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>
        </form>
    );
}
