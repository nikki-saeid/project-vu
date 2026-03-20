import P from '@/components/typography/P';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import Image from 'next/image';
import SectionHeader from './section-header';

// const BG_IMAGES = [
//     { size: 18, rotation: 0, x: 29, y: 64 },
//     { size: 22, rotation: 15, x: 10, y: 20 },
//     { size: 25, rotation: -10, x: 70, y: 30 },
//     { size: 17, rotation: 25, x: 85, y: 80 },
//     { size: 30, rotation: -30, x: 50, y: 10 },
//     { size: 21, rotation: 45, x: 15, y: 75 },
//     { size: 27, rotation: -20, x: 60, y: 55 },
//     { size: 19, rotation: 10, x: 40, y: 40 },
//     { size: 23, rotation: -45, x: 90, y: 15 },
//     { size: 16, rotation: 5, x: 5, y: 50 },

//     { size: 28, rotation: -15, x: 75, y: 65 },
//     { size: 20, rotation: 30, x: 20, y: 35 },
//     { size: 26, rotation: 12, x: 33, y: 22 },
//     { size: 17, rotation: -18, x: 44, y: 78 },
//     { size: 24, rotation: 36, x: 66, y: 12 },
//     { size: 29, rotation: -22, x: 12, y: 58 },
//     { size: 18, rotation: 8, x: 81, y: 42 },
//     { size: 21, rotation: -40, x: 52, y: 88 },
//     { size: 30, rotation: 27, x: 37, y: 5 },
//     { size: 19, rotation: -12, x: 93, y: 60 },

//     { size: 23, rotation: 33, x: 7, y: 72 },
//     { size: 16, rotation: -5, x: 48, y: 33 },
//     { size: 28, rotation: 19, x: 62, y: 47 },
//     { size: 20, rotation: -28, x: 14, y: 90 },
//     { size: 25, rotation: 41, x: 78, y: 18 },
//     { size: 17, rotation: -35, x: 56, y: 26 },
//     { size: 22, rotation: 9, x: 31, y: 70 },
//     { size: 27, rotation: -14, x: 84, y: 53 },
//     { size: 18, rotation: 24, x: 69, y: 8 },
//     { size: 30, rotation: -9, x: 2, y: 44 },

//     { size: 21, rotation: 17, x: 95, y: 77 },
//     { size: 26, rotation: -31, x: 39, y: 61 },
//     { size: 19, rotation: 6, x: 73, y: 29 },
//     { size: 24, rotation: -21, x: 58, y: 14 },
//     { size: 28, rotation: 38, x: 11, y: 48 },
//     { size: 16, rotation: -11, x: 46, y: 82 },
//     { size: 23, rotation: 29, x: 67, y: 36 },
//     { size: 20, rotation: -7, x: 25, y: 57 },
//     { size: 27, rotation: 13, x: 88, y: 24 },
//     { size: 18, rotation: -26, x: 53, y: 73 },

//     { size: 30, rotation: 44, x: 36, y: 11 },
//     { size: 22, rotation: -19, x: 79, y: 66 },
//     { size: 25, rotation: 7, x: 17, y: 39 },
//     { size: 19, rotation: -33, x: 63, y: 85 },
//     { size: 28, rotation: 21, x: 41, y: 52 },
//     { size: 17, rotation: -8, x: 92, y: 31 },
//     { size: 24, rotation: 34, x: 55, y: 19 },
//     { size: 20, rotation: -16, x: 8, y: 63 },
//     { size: 26, rotation: 11, x: 72, y: 46 },
//     { size: 18, rotation: -27, x: 34, y: 79 },
// ];

// const BG_IMAGES = [
//     { size: 18, rotation: 0, x: 102, y: 110 },
//     { size: 22, rotation: 15, x: 98, y: 105 },
//     { size: 25, rotation: -10, x: 115, y: 100 },
//     { size: 17, rotation: 25, x: 120, y: 118 },
//     { size: 30, rotation: -30, x: 108, y: 95 },
//     { size: 21, rotation: 45, x: 97, y: 112 },
//     { size: 27, rotation: -20, x: 111, y: 107 },
//     { size: 19, rotation: 10, x: 104, y: 99 },
//     { size: 23, rotation: -45, x: 119, y: 96 },
//     { size: 16, rotation: 5, x: 95, y: 109 },

//     { size: 28, rotation: -15, x: 117, y: 113 },
//     { size: 20, rotation: 30, x: 101, y: 97 },
//     { size: 26, rotation: 12, x: 109, y: 120 },
//     { size: 17, rotation: -18, x: 96, y: 104 },
//     { size: 24, rotation: 36, x: 113, y: 98 },
//     { size: 29, rotation: -22, x: 100, y: 116 },
//     { size: 18, rotation: 8, x: 118, y: 102 },
//     { size: 21, rotation: -40, x: 106, y: 119 },
//     { size: 30, rotation: 27, x: 112, y: 95 },
//     { size: 19, rotation: -12, x: 99, y: 111 },
// ];

// const BG_IMAGES = [
//     { size: 28, rotation: -15, x: 0, y: 0 },
//     { size: 28, rotation: -15, x: 10, y: 25 },
//     { size: 28, rotation: -15, x: 20, y: 55 },
//     { size: 28, rotation: -15, x: 30, y: 87 },

//     { size: 28, rotation: -15, x: 30, y: 30 },
//     { size: 28, rotation: -15, x: 60, y: 60 },
//     { size: 28, rotation: -15, x: 90, y: 90 },
//     { size: 28, rotation: -15, x: 120, y: 120 },

//     { size: 28, rotation: -15, x: 33, y: 10 },
//     { size: 28, rotation: -15, x: 68, y: 20 },
//     { size: 28, rotation: -15, x: 88, y: 30 },
// ];

const BG_IMAGES = [
    { size: 22, rotation: -12, x: 5, y: 10 },
    { size: 30, rotation: -28, x: 15, y: 35 },
    { size: 18, rotation: -6, x: 25, y: 60 },
    { size: 27, rotation: -20, x: 35, y: 90 },

    { size: 24, rotation: -9, x: 45, y: 15 },
    { size: 32, rotation: -30, x: 55, y: 40 },
    { size: 20, rotation: -4, x: 65, y: 70 },
    { size: 29, rotation: -18, x: 75, y: 100 },

    { size: 26, rotation: -14, x: 85, y: 20 },
    { size: 19, rotation: -7, x: 95, y: 50 },
    { size: 31, rotation: -25, x: 105, y: 80 },
    { size: 23, rotation: -11, x: 115, y: 110 },

    { size: 28, rotation: -22, x: 20, y: 25 },
    { size: 21, rotation: -5, x: 40, y: 55 },
    { size: 33, rotation: -32, x: 60, y: 85 },
    { size: 25, rotation: -13, x: 80, y: 115 },

    { size: 17, rotation: -3, x: 30, y: 5 },
    { size: 34, rotation: -35, x: 70, y: 30 },
    { size: 22, rotation: -10, x: 100, y: 60 },
    { size: 27, rotation: -17, x: 50, y: 95 },
];
export default function AboutUs() {
    return (
        <div className="relative">
            <section className="flex flex-col items-center gap-4 md:gap-6 z-1" id={SECTIONS_IDS.aboutUs}>
                <SectionHeader label="ABOUT US" title="ProjectVu turns your completed projects into a professional portfolio" />
                {/* {BG_IMAGES.map(({ size, rotation, x, y }, index) => (
                    <Image
                        key={index}
                        src="/brand/logo-icon.webp"
                        className="opacity-25"
                        width={20}
                        height={20}
                        alt="icon logo of ProjectVu"
                        style={{
                            position: 'absolute',
                            transform: `rotate(${rotation}deg)`,
                            top: `-${y}px`,
                            right: `calc(100% - ${9 * x}px)`,
                            width: `${size}px`,
                        }}
                    />
                ))} */}
                <P className="text-justify leading-6 [text-align-last:center]">
                    <strong>ProjectVu</strong> is a modern platform that helps professionals showcase their work in a clear, visual, and
                    compelling way . We turn your completed projects into a professional portfolio, combining photos, locations, and key
                    details all in one place. <strong>ProjectVu can act as a mini website if you don&apos;t have one</strong>, or it can{' '}
                    <strong>work alongside your existing website</strong> to enhance your online presence. Your projects can be viewed on an{' '}
                    <strong>interactive map </strong>or in a <strong>clean list format</strong>, giving clients a complete picture of what
                    you&apos;ve done and where you&apos;ve done it. Our goal is simple:{' '}
                    <strong>helping you showcase your work at its best and win more opportunities.</strong>
                </P>
            </section>
        </div>
    );
}
