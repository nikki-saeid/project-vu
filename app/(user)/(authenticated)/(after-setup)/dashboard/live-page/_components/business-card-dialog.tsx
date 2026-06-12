'use client';

import BusinessProfileWithQrCodeCard from '@/components/business-ui/business-profile-with-qr-code-card';
import DialogCore from '@/components/dialog-core';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';

export default function BusinessCardDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const { business } = useDashboard();
    const filename = (business?.slug ?? '') + '-profile-card.png';
    const ref = useRef<HTMLDivElement>(null);

    const capture = useCallback(async (): Promise<string | null> => {
        if (!ref.current) return null;

        // Replace every <canvas> with an <img> of its pixel data, capture, then restore
        const node = ref.current;
        const canvases = Array.from(node.querySelectorAll<HTMLCanvasElement>('canvas'));
        const replacements: { img: HTMLImageElement; canvas: HTMLCanvasElement; parent: Node }[] = [];

        canvases.forEach((canvas) => {
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            img.width = canvas.offsetWidth;
            img.height = canvas.offsetHeight;
            img.style.cssText = window.getComputedStyle(canvas).cssText;
            canvas.parentNode!.replaceChild(img, canvas);
            replacements.push({ img, canvas, parent: img.parentNode! });
        });

        try {
            return await toPng(node, { cacheBust: true, pixelRatio: 10 });
        } finally {
            // Restore canvases
            replacements.forEach(({ img, canvas }) => {
                img.parentNode?.replaceChild(canvas, img);
            });
        }
    }, []);

    const handleDownload = useCallback(async () => {
        const dataUrl = await capture();
        if (!dataUrl) return;
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    }, [capture, filename]);

    const handleShare = useCallback(async () => {
        const dataUrl = await capture();
        if (!dataUrl) return;
        try {
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], filename, { type: 'image/png' });
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    title: business?.name ?? 'Business Profile',
                    text: 'Check out my business profile',
                    files: [file],
                });
            } else {
                handleDownload();
            }
        } catch (error) {
            console.error(error);
        }
    }, [business, capture, filename, handleDownload]);

    return (
        <DialogCore
            action={
                <Button className="flex-1" onClick={handleShare}>
                    Share or download
                </Button>
            }
            content={
                <div className="flex flex-col gap-4 w-full">
                    <P className="text-sm">
                        This is your business profile card. You can download it, print it, or share it with your customers.
                    </P>
                    {business && (
                        <div ref={ref} className="self-center">
                            <BusinessProfileWithQrCodeCard business={business} />
                        </div>
                    )}
                </div>
            }
            title="Profile card"
            open={open}
            onOpenChange={setOpen}
        />
    );
}
