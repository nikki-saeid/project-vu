'use client';

import { usePublic } from '@/lib/contexts/public-context';
import H4 from '../typography/H4';
import P from '../typography/P';
import { Badge } from '../ui/badge';
import BusinessAvatar from './business-avatar';

export default function BusinessHeader() {
    const { business } = usePublic();

    const { name, logo_url, type, description } = business ?? {
        name: null,
        logo_url: null,
        type: null,
        description: null,
    };

    return (
        <header className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <BusinessAvatar logo_url={logo_url} name={name} />
                <div className="flex flex-col gap-1">
                    <H4>{name}</H4>
                    <Badge variant="default">{type}</Badge>
                </div>
            </div>
            <P className="text-muted-foreground">{description}</P>
        </header>
    );
}
