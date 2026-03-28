import type { LogoProps } from '@/lib/types/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isWhite, variant = 'full' }: LogoProps) {
    return (
        <Link href="/">
            <div className="text-2xl text-nowrap font-bold text-center ">
                {variant !== 'icon' && <span className={isWhite ? 'text-white' : 'text-foreground'}>Project </span>}

                <Image
                    src={isWhite ? '/brand/logo-white.webp' : '/brand/logo.webp'}
                    width={210}
                    height={352}
                    alt="ProjectVu logo"
                    className="w-4.25 inline mb-3.75"
                    loading="eager"
                />

                {variant !== 'icon' && <span className={isWhite ? 'text-white' : 'text-primary'}>u</span>}
            </div>
        </Link>
    );
}
