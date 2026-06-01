'use client';

import BusinessProfileWithQrCodeCard from '@/components/business-ui/business-profile-with-qr-code-card';
import DialogCore from '@/components/dialog-core';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';

type EditPageDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function BusinessCardDialog({ open, setOpen }: EditPageDialogProps) {
    const { business } = useDashboard();

    const filename = (business?.slug ?? '') + '-profile-card' + '.png';
    const ref = useRef<HTMLDivElement>(null);

    const handleDownload = useCallback(async () => {
        if (ref.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 10 });
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            // throw new Error(JSON.stringify(error, null, 2));
            console.log(error);
        }
    }, [ref, filename]);

    const handleShare = useCallback(async () => {
        if (!ref.current) return;

        try {
            const dataUrl = await toPng(ref.current, {
                cacheBust: true,
                pixelRatio: 10,
            });

            const blob = await (await fetch(dataUrl)).blob();

            const file = new File([blob], filename, {
                type: 'image/png',
            });

            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    title: business?.name ?? 'Business Profile',
                    text: 'Check out my business profile',
                    files: [file],
                });
            } else {
                // Fallback: download image
                handleDownload();
            }
        } catch (error) {
            console.error(error);
        }
    }, [business, filename, handleDownload]);

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
