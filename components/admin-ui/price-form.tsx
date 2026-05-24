'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { adminCreatePrice, adminUpdatePrice } from '@/lib/api-fetcher/admin/client/pricing';
import { adminGetAllPricing } from '@/lib/api-fetcher/admin/server/pricing';
import { useAdmin } from '@/lib/contexts/admin-context';
import { APIResponseSend } from '@/lib/helpers/api-response';
import type { PriceFormProps } from '@/lib/types/forms';
import { cn } from '@/lib/utils/classes-merge';
import { PriceCreateInput, priceCreateSchema } from '@/lib/validators/user/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Stripe from 'stripe';
import WarningAlert from '../warning-alert';

function BenefitInput({ append }: { append: (obj: { value: string }) => void }) {
    const [value, setValue] = useState('');

    return (
        <div className="flex gap-2">
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add benefit..." />

            <Button
                type="button"
                onClick={() => {
                    if (!value.trim()) return;
                    append({ value: value.trim() });
                    setValue('');
                }}
                variant="outline"
            >
                Add
            </Button>
        </div>
    );
}

export default function PriceForm({ id, setIsLoading, onSuccess, price }: PriceFormProps) {
    const { setPricings } = useAdmin();

    let product: Stripe.Product | null = null;
    let description: string | null = null;
    let saving: string | null = null;
    let benefits: { value: string }[] | null = null;

    if (price) {
        product = typeof price.product !== 'string' && !price.product.deleted ? price.product : null;

        if (product) {
            description = product.description;

            const metadata = product.metadata;
            saving = metadata.saving;
            benefits = metadata.benefits ? JSON.parse(metadata.benefits) : null;
        }
    }

    const form = useForm<PriceCreateInput>({
        resolver: zodResolver(priceCreateSchema),
        defaultValues: {
            active: price?.active ?? true,
            unit_amount: 0,
            interval: 'month',
            interval_count: 1,

            // product
            name: product?.name ?? '',
            description: description ?? '',
            benefits: benefits ?? [],
            saving: saving ? parseFloat(saving) : 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'benefits',
    });

    const onSubmit = async (data: PriceCreateInput) => {
        setIsLoading(true);

        try {
            const body = JSON.stringify({
                active: data.active,
                unit_amount: data.unit_amount * 100,
                nikname: data.name,

                // recurring
                interval: data.interval,
                interval_count: data.interval_count,

                // product
                name: data.name,
                description: data.description,
                benefits: JSON.stringify(data.benefits),
                saving: data.saving,

                productId: product?.id ?? '',
            });

            let response: APIResponseSend<Stripe.Price> | null = null;

            if (price) {
                response = await adminUpdatePrice(price.id, body);
            } else {
                response = await adminCreatePrice(body);
            }

            toast.success(response.message);

            const pricings = await adminGetAllPricing();
            setPricings(pricings);

            form.reset();
            onSuccess?.();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'Failed to create price');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-4 md:gap-6')}>
            <WarningAlert
                title="You cannot delete a Price in Stripe"
                description="Once a Price object is created and used, it remains in your Stripe account permanently to preserve historical logs, financial
                reporting, and invoice data."
                subWarning="Instead of deleting it, the standard Stripe workflow is to deactivate the price."
            />
            <Controller
                name="active"
                control={form.control}
                render={({ field }) => (
                    <Field className="flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <FieldLabel>Active</FieldLabel>

                            <FieldDescription>Allow this price for new purchases.</FieldDescription>
                        </div>

                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </Field>
                )}
            />

            {/* Product name */}
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Product Name</FieldLabel>

                        <InputGroup>
                            <InputGroupInput {...field} placeholder="Pro Plan" autoComplete="off" />
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Description */}
            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Description</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea {...field} placeholder="Describe this pricing plan" autoComplete="off" />
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Benefits */}
            <Controller
                name="benefits"
                control={form.control}
                render={({ fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Benefits</FieldLabel>
                        <FieldDescription>Press Enter or click Add to add a benefit.</FieldDescription>

                        {/* INPUT ROW */}
                        <BenefitInput append={append} />

                        {/* LIST */}
                        <div className="flex flex-col gap-2 mt-2">
                            {fields.map((item, index) => (
                                <Badge key={item.id} variant="outline">
                                    {item.value}
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="outline"
                                        size="icon-xs"
                                        className="rounded-full"
                                    >
                                        <IconX />
                                    </Button>
                                </Badge>
                            ))}
                        </div>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Price */}
            {!price && (
                <>
                    <Controller
                        name="unit_amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Price Amount</FieldLabel>
                                <FieldDescription>Amount in dollars.</FieldDescription>
                                <FieldDescription className="text-red-500 font-semibold">
                                    Note: The price amount can not be changed after the product has been created.
                                </FieldDescription>

                                <InputGroup>
                                    <InputGroupInput {...field} type="text" placeholder="19.95" />

                                    <InputGroupAddon align="inline-end">AUD</InputGroupAddon>
                                </InputGroup>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* Interval */}
                    <Controller
                        name="interval"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Billing Interval</FieldLabel>
                                <FieldDescription className="text-red-500 font-semibold">
                                    Note: The Billing Interval can not be changed after the product has been created.
                                </FieldDescription>

                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select interval" />
                                    </SelectTrigger>

                                    <SelectContent className="z-1000">
                                        <SelectItem value="month">Month</SelectItem>
                                        <SelectItem value="year">Year</SelectItem>
                                    </SelectContent>
                                </Select>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* Interval count */}
                    <Controller
                        name="interval_count"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Bolling Interval Count</FieldLabel>
                                <FieldDescription>This is the number of intervals, example: every 3 months.</FieldDescription>
                                <FieldDescription className="text-red-500 font-semibold">
                                    Note: The Bolling Interval Count can not be changed after the product has been created.
                                </FieldDescription>

                                <InputGroup>
                                    <InputGroupInput {...field} placeholder="1" />
                                </InputGroup>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </>
            )}
            {/* Saving */}
            <Controller
                name="saving"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Saving label</FieldLabel>
                        <FieldDescription>This is the saving label, example: save ~21%</FieldDescription>

                        <InputGroup>
                            <InputGroupInput {...field} placeholder="1" />
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </form>
    );
}
