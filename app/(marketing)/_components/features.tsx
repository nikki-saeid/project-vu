import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { IconAppWindow, IconArrowUp, IconLayoutList, IconMap, IconMap2, IconMapPin, IconShield, IconSparkles } from '@tabler/icons-react';
import FeatureCard from './feature-card';
import SectionHeader from './section-header';

export default function Features() {
    return (
        <section className="grid lg:grid-cols-2 items-center rounded-lg gap-4 md:gap-6 p-10 bg-muted" id={SECTIONS_IDS.features}>
            <SectionHeader
                label="FEATURES"
                title="Turn your finished projects into future work with photos, maps, and a shareable profile clients can explore instantly."
                description="Whether you're a builder, designer, electrician, joiner, or any professional, show your projects with photos, maps, and a shareable profile so clients can view and contact you instantly."
                center={false}
                secondary
            />

            <div className="flex flex-col flex-1 gap-4">
                <FeatureCard
                    Icon={IconAppWindow}
                    title="Your own professional page"
                    description="Create a shareable profile with your logo, project portfolio, and project details. Share it with clients, use it as a mini website, or embed it into your existing site, no coding needed."
                />
                <FeatureCard
                    Icon={IconMap2}
                    title="Explore projects on a map"
                    description="Display your projects on an interactive map where clients can see every location, photos, and project details at a glance."
                />
                <FeatureCard
                    Icon={IconLayoutList}
                    title="Browse projects in a list"
                    description="Show your work in a clean, visual list with photos and key project details for easy browsing."
                />
            </div>
        </section>
    );
}
