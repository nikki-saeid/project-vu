import { cn } from '@/lib/utils';
import type { LogoProps } from '@/lib/types/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isWhite, variant = 'full', className }: LogoProps) {
    return (
        <Link href="/">
            <div className={cn('flex items-center gap-1', className)}>
                <Image
                    src={isWhite ? '/brand/logo.webp' : '/brand/logo.webp'}
                    width={300}
                    height={300}
                    alt="ProjectVu logo"
                    className="aspect-square size-8.5 rounded-full"
                    loading="eager"
                />
                {variant !== 'icon' && (
                    <div
                        className={cn('text-2xl text-nowrap font-bold text-center tracking-wider', isWhite ? 'text-white' : 'text-primary')}
                    >
                        Project <span className={isWhite ? 'text-white' : 'text-primary'}>Vu</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
