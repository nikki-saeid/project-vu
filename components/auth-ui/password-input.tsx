'use client';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import type { PasswordInputProps } from '@/lib/types/features';
import { IconEye, IconEyeClosed, IconLock } from '@tabler/icons-react';
import { useState } from 'react';

export default function PasswordInput(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <InputGroup>
            <InputGroupAddon>
                <IconLock />
            </InputGroupAddon>
            <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
            <InputGroupAddon align="inline-end">
                <Button type="button" variant="ghost" className="h-8 w-8 rounded-full" size="icon" onClick={handleClickShowPassword}>
                    {showPassword ? <IconEyeClosed /> : <IconEye />}
                </Button>
            </InputGroupAddon>
        </InputGroup>
    );
}
