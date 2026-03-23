import { cn } from '@/lib/utils/classes-merge';
import type { LogoProps } from '@/lib/types/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isWhite, variant = 'full', className }: LogoProps) {
    return (
        <Link href="/">
            <div className={cn('flex items-end gap-1', className)}>
                <Image
                    src={isWhite ? '/brand/logo-white.webp' : '/brand/logo.webp'}
                    width={130}
                    height={130}
                    alt="ProjectVu logo"
                    className="aspect-square size-10.5 rounded-full"
                    loading="eager"
                />
                {variant !== 'icon' && (
                    <div
                        className={cn('text-2xl text-nowrap font-bold text-center leading-6.5', isWhite ? 'text-white' : 'text-foreground')}
                    >
                        Project <span className={isWhite ? 'text-white' : 'text-primary'}>Vu</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
