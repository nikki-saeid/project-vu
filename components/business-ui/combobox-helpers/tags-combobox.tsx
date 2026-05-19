'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/classes-merge';
import { IconChevronDown } from '@tabler/icons-react';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ControllerFieldState, ControllerRenderProps, UseFormReturn } from 'react-hook-form';

type Fields =
    | 'types'
    | 'name'
    | 'project_type_tags'
    | 'description'
    | 'phone'
    | 'service_type_tags'
    | 'website_url'
    | 'instagram_url'
    | 'facebook_url'
    | 'x_url'
    | `project_type_tags.${number}`
    | `service_type_tags.${number}`;

type ComboProps<T extends Fields> = {
    field: ControllerRenderProps<
        {
            name: string;
            description: string;
            types: string[];
            phone: string;
            service_type_tags: string[];
            project_type_tags: string[];
            website_url?: string | undefined;
            instagram_url?: string | undefined;
            facebook_url?: string | undefined;
            x_url?: string | undefined;
        },
        T
    >;
    form: UseFormReturn<
        {
            project_type_tags: string[];
            name: string;
            description: string;
            types: string[];
            phone: string;
            service_type_tags: string[];
            website_url?: string | undefined;
            instagram_url?: string | undefined;
            facebook_url?: string | undefined;
            x_url?: string | undefined;
        },
        unknown,
        {
            name: string;
            description: string;
            types: string[];
            phone: string;
            service_type_tags: string[];
            project_type_tags: string[];
            website_url?: string | undefined;
            instagram_url?: string | undefined;
            facebook_url?: string | undefined;
            x_url?: string | undefined;
        }
    >;
    name: Fields;
    items: string[];
    placeholder: string;
    fieldState: ControllerFieldState;
    initValue: string[];
};

export default function TagsCombobox<T extends Fields>({ form, field, name, items, placeholder, fieldState, initValue }: ComboProps<T>) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(initValue);
    const [openTooltip, setOpenTooltip] = useState(false);

    const handleRemoveValue = (value: string) => setSelectedValues(selectedValues.filter((v) => v !== value));
    const handleAddValue = (value: string) => {
        if (value === 'Other') {
            setOpenTooltip(true);
            return;
        }

        if (selectedValues.includes(value)) {
            handleRemoveValue(value);
        } else {
            setSelectedValues([...selectedValues, value]);
        }
        setOpenTooltip(false);
    };

    const [otherTag, setOtherTag] = useState('');
    const handleAddOtherValue = () => {
        handleAddValue(otherTag);
        setOtherTag('');
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setOpenTooltip(false);
        setOtherTag(e.target.value);
    };

    useEffect(() => {
        form.setValue(name, selectedValues);
    }, [selectedValues, form, name]);

    return (
        <Popover onOpenChange={setOpen} open={open} modal={true}>
            <div className="flex flex-wrap gap-1">
                <InputGroup className="h-fit flex flex-wrap">
                    {selectedValues.length > 0 && (
                        <div className="flex wrap gap-1 p-1 flex-wrap">
                            {selectedValues.map((value) => (
                                <Badge key={value} variant="outline">
                                    {value}
                                    <button
                                        type="button"
                                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onClick={() => handleRemoveValue(value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRemoveValue(value);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <X className="size-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                    <PopoverTrigger asChild>
                        <div className="flex flex-1">
                            <InputGroupAddon align="inline-end">
                                <IconChevronDown />
                            </InputGroupAddon>
                            <InputGroupInput
                                {...(field as { value: string })}
                                id="form-website"
                                type="text"
                                aria-invalid={fieldState.invalid}
                                placeholder={placeholder}
                                autoComplete="url"
                                value=""
                                className="flex-1"
                            />
                        </div>
                    </PopoverTrigger>
                </InputGroup>
            </div>

            <PopoverContent className="w-full p-0 z-1000 relative">
                <Command>
                    <Tooltip open={openTooltip}>
                        <TooltipTrigger>
                            <CommandInput value={otherTag} placeholder="Search..." onChangeCapture={handleOnChange} />
                        </TooltipTrigger>
                        <TooltipContent className="z-1000">
                            <p>Type your tags related to your business.</p>
                        </TooltipContent>
                    </Tooltip>
                    <CommandList>
                        <CommandEmpty className="p-1">
                            <Button size="sm" variant="grey" onClick={handleAddOtherValue} className="w-full">
                                use this tag
                                <span className="font-semibold text-foreground">&quot;{otherTag}&quot;</span>
                            </Button>
                        </CommandEmpty>
                        <CommandGroup>
                            {items.map((tag) => (
                                <CommandItem key={tag} onSelect={(value) => handleAddValue(value)} value={tag}>
                                    <Check className={cn('mr-2 size-4', selectedValues.includes(tag) ? 'opacity-100' : 'opacity-0')} />
                                    {tag}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
