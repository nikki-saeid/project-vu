import { IconBrandFacebook, IconBrandGoogle, IconBrandInstagram, IconBrandX, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Business } from '@/lib/types/db';
import { Separator } from '../ui/separator';

type BusinessSocialsProps = Pick<Business, 'website_url' | 'facebook_url' | 'instagram_url' | 'x_url' | 'google_map_url'>;

export default function BusinessSocials({ website_url, facebook_url, instagram_url, x_url, google_map_url }: BusinessSocialsProps) {
    const socials = Boolean(x_url) || Boolean(facebook_url) || Boolean(instagram_url) || Boolean(website_url);
    const google = Boolean(google_map_url);

    if (!socials && !google) return null;
    return (
        <div className="flex gap-1 items-center">
            {website_url && (
                <Link href={website_url} target="_blank">
                    <Button variant="outline" className="rounded-full" size="icon-xs">
                        <IconWorld />
                    </Button>
                </Link>
            )}
            {x_url && (
                <Link href={x_url} target="_blank">
                    <Button variant="outline" className="rounded-full" size="icon-xs">
                        <IconBrandX />
                    </Button>
                </Link>
            )}
            {facebook_url && (
                <Link href={facebook_url} target="_blank">
                    <Button variant="outline" className="rounded-full" size="icon-xs">
                        <IconBrandFacebook />
                    </Button>
                </Link>
            )}
            {instagram_url && (
                <Link href={instagram_url} target="_blank">
                    <Button variant="outline" className="rounded-full" size="icon-xs">
                        <IconBrandInstagram />
                    </Button>
                </Link>
            )}

            {google_map_url && (
                <>
                    {socials && <Separator orientation="vertical" style={{ height: '10px', margin: '0 5px' }} />}
                    <Link href={google_map_url} target="_blank">
                        <Button variant="outline" className="rounded-full" size="xs">
                            <IconBrandGoogle /> Rate us on Google
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
}
