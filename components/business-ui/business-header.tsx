import { Business } from '@/lib/types/db';
import H4 from '../typography/H4';
import P from '../typography/P';
import { Badge } from '../ui/badge';
import BusinessAvatar from './business-avatar';
import Link from 'next/link';

type BusinessHeaderProps = Pick<Business, 'name' | 'logo_url' | 'types' | 'description'> & { url?: string };

export default function BusinessHeader({ name, logo_url, types, description, url }: BusinessHeaderProps) {
    return (
        <header className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <BusinessAvatar logo_url={logo_url} name={name} />
                <div className="flex flex-col gap-1">
                    {url ? (
                        <Link href={url}>
                            <H4>{name}</H4>
                        </Link>
                    ) : (
                        <H4>{name}</H4>
                    )}

                    <div className="flex items-center gap-1 flex-wrap max-w-xs">
                        {types?.map((type) => (
                            <Badge key={type} variant="outline" className="capitalize">
                                {type}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            {description !== '' && <P className="text-foreground">{description}</P>}
        </header>
    );
}
