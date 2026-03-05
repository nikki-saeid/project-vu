import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectCardProps } from '@/lib/types/features';
import Image from 'next/image';

export default function ProjectCard({ action }: ProjectCardProps) {
    return (
        <Card className="relative pt-0 shadow-none overflow-hidden">
            {action && <div className="absolute top-2 right-2 z-54">{action}</div>}
            <Carousel className="relative">
                <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-between w-[calc(100%-140px)]">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <Image
                                width={180}
                                height={100}
                                src="/placeholder.svg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">Building</Badge>
                </CardAction>
                <CardTitle>Building 123</CardTitle>
                <CardDescription> Lorem ipsum dolor sit, amet consectetu</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">View Event</Button>
            </CardFooter>
        </Card>
    );
}
