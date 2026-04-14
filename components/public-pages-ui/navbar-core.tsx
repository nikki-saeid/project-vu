import React from 'react';
import Container from '../ui/container';

import { cn } from '@/lib/utils/classes-merge';
import { ChildrenProp, ClassNameProp } from '@/lib/types/common';

type NavbarCoreProps = ClassNameProp & ChildrenProp

export default function NavbarCore({className, children}: NavbarCoreProps) {
    return (
        <header className={cn('bg-background sticky top-0 z-500 border-b', className)}>
            <Container>
                <div className="flex items-center py-4 md:py-6 justify-between">
                    {children}
                </div>
            </Container>
        </header>
    );
}
