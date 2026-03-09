'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BASE_URL } from '@/lib/constants/urls';
import { usePublic } from '@/lib/contexts/public-context';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useCallback, useState } from 'react';

export default function EmbedCodeSection() {
    const { business } = usePublic();
    const slug = business?.slug;
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [copiedIframe, setCopiedIframe] = useState(false);

    const embedUrl = slug ? `${BASE_URL}/embed/${slug}` : '';
    const iframeCode = slug
        ? `<iframe src="${BASE_URL}/embed/${slug}" width="100%" height="400" style="border:0;" allowfullscreen title="Map"></iframe>`
        : '';

    const copyToClipboard = useCallback(async (text: string, setCopied: (v: boolean) => void) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // ignore
        }
    }, []);

    if (!slug) {
        return (
            <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center text-muted-foreground">
                <p className="text-sm">Set up your business page and slug first to get an embed link.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <Field>
                <FieldLabel>Embed URL</FieldLabel>
                <FieldDescription className="data-[invalid=true]:text-destructive">
                    Share this link or use it in an iframe on your website.
                </FieldDescription>
                <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(embedUrl, setCopiedUrl)}
                        className="self-end"
                        aria-label="Copy embed code"
                    >
                        {copiedUrl ? <IconCheck /> : <IconCopy />}
                        {copiedUrl ? 'Copied' : 'Copy'}
                    </Button>
                    <Input readOnly={true} value={embedUrl} />
                </div>
            </Field>

            <Field>
                <FieldLabel>Embed code</FieldLabel>
                <FieldDescription className="data-[invalid=true]:text-destructive">
                    Paste this HTML into your website to show the map.
                </FieldDescription>
                <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(iframeCode, setCopiedIframe)}
                        className="self-end"
                        aria-label="Copy embed code"
                    >
                        {copiedIframe ? <IconCheck /> : <IconCopy />}
                        {copiedIframe ? 'Copied' : 'Copy'}
                    </Button>
                    <Textarea readOnly={true} value={iframeCode} />
                </div>
            </Field>

            {/* <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <label className="text-sm font-medium">Embed code</label>
                        <p className="text-xs text-muted-foreground">Paste this HTML into your website to show the map.</p>
                    </div>
                    
                </div>
            </div> */}
        </div>
    );
}
