import { getLiveUrl } from '@/lib/helpers/other';
import { Business } from '@/lib/types/db';
import { useQRCode } from 'next-qrcode';
import H3 from '../typography/H3';
import P from '../typography/P';
import Logo from '../logo';

type BusinessProfileWithQrCodeCardProps = {
    business: Business;
};

export default function BusinessProfileWithQrCodeCard({ business }: BusinessProfileWithQrCodeCardProps) {
    const { Canvas } = useQRCode();

    const url = getLiveUrl(business?.slug) || 'https://www.projectvu.com.au';

    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <div className="flex flex-col gap-5 items-center p-5  from-transparent to-primary/15 bg-linear-0">
                <div className="border rounded-lg p-5 bg-white">
                    <div className="relative">
                        {business.favicon_url && (
                            <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={business.favicon_url} width={35} alt="ProjectVu logo" loading="eager" />
                            </div>
                        )}
                        <Canvas
                            text={url}
                            options={{
                                errorCorrectionLevel: 'H',
                                margin: 0,
                                scale: 5,
                                width: 180,
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <H3>{business.name}</H3>
                    <P>{business.type}</P>
                </div>
                <div className="flex flex-col items-center">
                    <P>{business.phone}</P>
                    <P>{url.split('//')[1]}</P>
                </div>

                <Logo variant="small" />
            </div>
        </div>
    );
}
