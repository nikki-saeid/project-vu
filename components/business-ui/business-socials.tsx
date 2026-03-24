import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type BusinessSocialsProps = {
    website_url: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    x_url: string | null;
};

export default function BusinessSocials({ website_url, facebook_url, instagram_url, x_url }: BusinessSocialsProps) {
    const socials = Boolean(x_url) || Boolean(facebook_url) || Boolean(instagram_url) || Boolean(website_url);

    if (!socials) return null;
    return (
        <div className="flex gap-1">
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
        </div>
    );
}
