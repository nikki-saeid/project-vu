import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconWorld } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { BusinessSocialsProps } from '@/lib/types/features';

export default function BusinessSocials({ website_url, facebook_url, instagram_url, x_url }: BusinessSocialsProps) {
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
