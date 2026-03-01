import { cn } from '@/lib/utils';
import type { LogoProps } from '@/types/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isWhite, variant = 'full', className }: LogoProps) {
    return (
        <Link href="/">
            <Image
                src={variant === 'icon' ? '/brand/logo-icon.webp' : isWhite ? '/brand/logo-white.webp' : '/brand/logo.webp'}
                width={728}
                height={200}
                alt="Fit manage logo"
                className={cn('w-32 md:w-40', className)}
            />
        </Link>
    );
}
