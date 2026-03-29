import { Business } from '@/lib/types/db';
import H4 from '../typography/H4';
import P from '../typography/P';
import { Badge } from '../ui/badge';
import BusinessAvatar from './business-avatar';

type BusinessHeaderProps = Pick<Business, 'name' | 'logo_url' | 'type' | 'description'>;

export default function BusinessHeader({ name, logo_url, type, description }: BusinessHeaderProps) {
    return (
        <header className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <BusinessAvatar logo_url={logo_url} name={name} />
                <div className="flex flex-col gap-1">
                    <H4>{name}</H4>
                    <Badge variant="outline">{type}</Badge>
                </div>
            </div>
            <P className="text-foreground">{description}</P>
        </header>
    );
}
