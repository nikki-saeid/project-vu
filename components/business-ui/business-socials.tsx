'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconWorld } from '@tabler/icons-react';
import { Button } from '../ui/button';

export default function BusinessSocials() {
    const { business } = usePublic();
    const { website_url, facebook_url, instagram_url, x_url } = business ?? {
        website_url: null,
        facebook_url: null,
        instagram_url: null,
        x_url: null,
    };
    const socials = Boolean(x_url) || Boolean(facebook_url) || Boolean(instagram_url) || Boolean(website_url);

    if (!socials) return null;
    return (
        <div className="flex gap-1">
            {website_url && (
                <Button variant="outline" className="rounded-full" size="icon-xs">
                    <IconWorld />
                </Button>
            )}
            {x_url && (
                <Button variant="outline" className="rounded-full" size="icon-xs">
                    <IconBrandX />
                </Button>
            )}
            {facebook_url && (
                <Button variant="outline" className="rounded-full" size="icon-xs">
                    <IconBrandFacebook />
                </Button>
            )}
            {instagram_url && (
                <Button variant="outline" className="rounded-full" size="icon-xs">
                    <IconBrandInstagram />
                </Button>
            )}
        </div>
    );
}
