import { ClassNameProp } from '@/lib/types/common';
import type { LogoProps } from '@/lib/types/ui';
import { cn } from '@/lib/utils/classes-merge';
import Link from 'next/link';

type LogoImageProps = LogoProps & ClassNameProp;

export function LogoImage({ isWhite, variant, size, isPng }: LogoImageProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={
                isPng
                    ? '/brand/logo-full.png'
                    : variant === 'icon'
                      ? isWhite
                          ? '/brand/logo-white.webp'
                          : '/brand/logo.webp'
                      : isWhite
                        ? '/brand/logo-full-white.webp'
                        : '/brand/logo-full.webp'
            }
            alt="ProjectVu logo"
            className={cn('w-30 m-auto', size === 'sm' && 'w-20', size === 'md' && 'w-25', size === '2xs' && 'w-4')}
        />
    );
}

export default function Logo({ isWhite, variant, size, isPng }: LogoProps) {
    return variant === 'no-link' ? (
        <LogoImage isWhite={isWhite} variant={variant} size={size} isPng={isPng} />
    ) : (
        <Link href="/">
            <LogoImage isWhite={isWhite} variant={variant} size={size} isPng={isPng} />
        </Link>
    );
}
