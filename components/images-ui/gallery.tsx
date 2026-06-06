import { cn } from '@/lib/utils/classes-merge';
import { VideoPlayer } from '../shadix-ui/components/video-player/video-player';

type GalleryImage = {
    src: string;
    alt: string;
    className?: string;
};

type GallerySection = {
    className?: string;
    images: GalleryImage[];
};

type GalleryProps = {
    sections: GallerySection[];
    onOpen?: (index: number) => void;
};

export default function Gallery({ sections, onOpen }: GalleryProps) {
    return (
        <div className="flex gap-4 h-100">
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={cn('flex-1', section.className ?? 'flex flex-col gap-4')}>
                    {section.images.map((image, imageIndex) =>
                        image.src.includes('video') ? (
                            <VideoPlayer cover isThumbnail key={imageIndex} src={image.src} className="w-full" />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                onClick={() => onOpen?.(imageIndex + 1)}
                                key={imageIndex}
                                src={image.src}
                                alt={image.alt}
                                className="rounded-lg h-full w-full object-cover"
                            />
                        ),
                    )}
                </div>
            ))}
        </div>
    );
}
