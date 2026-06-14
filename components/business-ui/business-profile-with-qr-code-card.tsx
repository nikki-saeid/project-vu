import { arrayToSequentialString, getLiveUrl } from '@/lib/helpers/other';
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
                        <Canvas
                            text={url}
                            options={{
                                errorCorrectionLevel: 'H',
                                margin: 0,
                                scale: 5,
                                width: 130,
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center text-center w-57.5">
                    <H3 className="text-center">{business.name}</H3>

                    <P className="text-center">{arrayToSequentialString(business.types ?? [])}</P>
                </div>
                <div className="flex flex-col items-center w-57.5">
                    <P className="text-center">{business.phone}</P>
                    <P className="text-center">{url.split('//')[1]}</P>
                </div>

                <Logo variant="small" />
            </div>
        </div>
    );
}
