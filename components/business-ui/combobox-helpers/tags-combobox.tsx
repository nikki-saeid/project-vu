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
import { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/classes-merge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import { IconUser } from '@tabler/icons-react';

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
};

export default function TagsCombobox<T extends Fields>({ form, field, name, items, placeholder }: ComboProps<T>) {
    const [otherTag, setOtherTag] = useState('');
    const [open, setOpen] = useState(false);
    const [openTooltip, setOpenTooltip] = useState(false);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenTooltip(false);
        setOtherTag(e.target.value);
    };
    const handleAdd = () => {
        setOpen(false);
        if (otherTag !== '') {
            const values = form.getValues(name);
            if (Array.isArray(values) && !values.includes(otherTag)) {
                form.setValue(name, [...values, otherTag]);
            }
        }
        setOtherTag('');
    };

    const showDefaultList = otherTag === '' || items.some((i) => i.toLowerCase().includes(otherTag.toLowerCase()));

    return (
        // <Popover open={open} onOpenChange={setOpen} modal={!open}>
        //     <Combobox
        //         items={items}
        //         value={Array.isArray(field.value) ? field.value : []}
        //         onValueChange={(value) => {
        //             if (value.includes('Other')) {
        //                 setOtherTag('');
        //                 setOpen(false);
        //                 setOpenTooltip(true);
        //                 return;
        //             }
        //             field.onChange(value);
        //         }}
        //         name={field.name}
        //         multiple
        //     >
        //         <ComboboxChips>
        //             <ComboboxValue>
        //                 {Array.isArray(field.value) && field.value.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)}
        //             </ComboboxValue>
        //             <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
        //                 <TooltipTrigger>
        //                     <div className="absolute top-0 -right-2"></div>
        //                 </TooltipTrigger>
        //                 <TooltipContent className="z-1000">
        //                     <p>Type your tags related to your business.</p>
        //                 </TooltipContent>
        //             </Tooltip>
        //             <PopoverTrigger>
        //                 <ComboboxChipsInput onChange={handleOnChange} placeholder={placeholder} />
        //             </PopoverTrigger>
        //         </ComboboxChips>
        //         <PopoverContent>
        //             {showDefaultList ? (
        //                 <ComboboxContent className="pointer-events-auto overflow-auto">
        //                     <ComboboxList className="overflow-y-auto overscroll-contain">
        //                         {(item: string) => (
        //                             <ComboboxItem key={item} value={item}>
        //                                 {item}
        //                             </ComboboxItem>
        //                         )}
        //                     </ComboboxList>
        //                 </ComboboxContent>
        //             ) : (
        //                 <ComboboxContent className="pointer-events-auto overflow-auto">
        //                     {/* if empty */}
        //                     <ComboboxEmpty className="p-1">
        //                         <Button size="sm" variant="grey" onClick={handleAdd} className="w-full">
        //                             use this tag
        //                             <span className="font-semibold text-foreground">&quot;{otherTag}&quot;</span>
        //                         </Button>
        //                     </ComboboxEmpty>

        //                     {/* if not empty */}
        //                     <ComboboxList className="overflow-y-auto">
        //                         {(item: string) => (
        //                             <ComboboxItem key={item} value={item}>
        //                                 {item}
        //                             </ComboboxItem>
        //                         )}
        //                     </ComboboxList>
        //                 </ComboboxContent>
        //             )}
        //         </PopoverContent>
        //     </Combobox>
        // </Popover>

        <>
            <Popover modal={true}>
                <Combobox
                    items={items}
                    value={Array.isArray(field.value) ? field.value : []}
                    onValueChange={(value) => {
                        if (value.includes('Other')) {
                            setOtherTag('');
                            setOpenTooltip(true);
                            return;
                        }

                        field.onChange(value);
                    }}
                    name={field.name}
                    multiple
                >
                    <ComboboxChips>
                        <ComboboxValue>
                            {Array.isArray(field.value) && field.value.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)}
                        </ComboboxValue>

                        <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                            <TooltipTrigger asChild>
                                <div className="absolute top-0 -right-2" />
                            </TooltipTrigger>

                            <TooltipContent className="z-1000">
                                <p>Type your tags related to your business.</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* FIX */}
                        <ComboboxChipsInput onChange={handleOnChange} placeholder={placeholder} />
                    </ComboboxChips>

                    <PopoverContent
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        align="start"
                        className="z-1000 w-(--radix-popover-trigger-width) p-0"
                    >
                        {showDefaultList ? (
                            <ComboboxContent className="border-0">
                                <ComboboxList className="max-h-60 overflow-y-auto">
                                    {(item: string) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        ) : (
                            <ComboboxContent className="border-0">
                                <ComboboxEmpty className="p-1">
                                    <Button size="sm" variant="grey" onClick={handleAdd} className="w-full">
                                        use this tag
                                        <span className="font-semibold text-foreground">&quot;{otherTag}&quot;</span>
                                    </Button>
                                </ComboboxEmpty>
                            </ComboboxContent>
                        )}
                    </PopoverContent>
                </Combobox>
            </Popover>
        </>
    );
}
