import React from 'react';
import BusinessAvatar from './business-avatar';
import H4 from '../typography/H4';
import { Badge } from '../ui/badge';
import P from '../typography/P';
import { BusinessHeaderProps } from '@/lib/types/features';

export default function BusinessHeader({ name, logo_url, type, description }: BusinessHeaderProps) {
    return (
        <header className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <BusinessAvatar isEdit={false} logo_url={logo_url} name={name} />
                <div className="flex flex-col gap-1">
                    <H4>{name ?? 'Business name'}</H4>
                    <Badge variant="secondary">{type ?? 'type'}</Badge>
                </div>
            </div>
            <P className="text-muted-foreground">
                {description ??
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque iste doloribus beatae deleniti, iusto reprehenderit fugit quas sapiente mollitia laudantium sunt voluptate velit nulla amet facere, in quae aperiam necessitatibus.'}
            </P>
        </header>
    );
}
