import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { IconAppWindow, IconLayoutList, IconMap2 } from '@tabler/icons-react';
import FeatureCard from './feature-card';
import SectionHeader from './section-header';

export default function Features() {
    return (
        <section id={SECTIONS_IDS.features}>
            <Container>
                <div className="p-10 rounded-lg border shadow-none bg-transparent flex flex-col gap-4 md:gap-6">
                    <SectionHeader
                        label="FEATURES"
                        // title="Turn your finished projects into future work with photos, maps, and a shareable profile clients can explore instantly."
                        description="Whether you're a builder, designer, electrician, joiner, or any professional, show your projects with photos, maps, and a shareable profile so clients can view and contact you instantly."
                    />

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 flex-1 gap-4">
                        <FeatureCard
                            Icon={IconAppWindow}
                            title="Your Profile"
                            description="Create a shareable profile with your logo and projects. Share it, use it as a mini website, or embed it into your site, no coding needed"
                            subTitle="Your professional page"
                        />
                        <FeatureCard
                            Icon={IconMap2}
                            title="Map View"
                            description="Display your projects on an interactive map with locations, photos, and key details at a glance."
                            subTitle="Explore projects on a map"
                        />
                        <FeatureCard
                            Icon={IconLayoutList}
                            title="List View"
                            description="Show your work in a clean list with photos and key project details for easy browsing."
                            subTitle="Browse projects in a list"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
