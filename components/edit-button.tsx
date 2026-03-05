import React from 'react';
import { Button, ButtonType } from './ui/button';
import { IconPencil } from '@tabler/icons-react';

export default function EditButton(props: ButtonType) {
    return (
        <Button size="icon-sm" className="shadow-none rounded-full border-0" {...props}>
            <IconPencil />
        </Button>
    );
}
