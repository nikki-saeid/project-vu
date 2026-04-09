import type { LogoProps } from '@/lib/types/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isWhite, variant = 'full' }: LogoProps) {
    return variant === 'no-icon' ? (
        <div></div>
    ) : (
        <Link href="/">
            {variant === 'black' ? (
                <Image
                    src="/brand/logo-black.webp"
                    width={210}
                    height={352}
                    alt="ProjectVu logo"
                    className="inline md:w-5.25 sm:w-4.5 w-4.25"
                    loading="eager"
                />
            ) : (
                <div className="text-lg sm:text-xl md:text-2xl text-nowrap font-bold text-center ">
                    {variant !== 'icon' && <span className={isWhite ? 'text-white' : 'text-foreground'}>Project </span>}

                    <Image
                        src={isWhite ? '/brand/logo-white.webp' : '/brand/logo.webp'}
                        width={210}
                        height={352}
                        alt="ProjectVu logo"
                        className="inline md:w-4.25 md:mb-3.75 sm:w-3.5 sm:mb-3.25 w-3.25 mb-2.75 "
                        loading="eager"
                    />

                    {variant !== 'icon' && <span className={isWhite ? 'text-white' : 'text-primary'}>u</span>}
                </div>
            )}
        </Link>
    );
}
