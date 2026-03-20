import { IconArrowRight, IconMapPin, IconShield, IconSparkles } from '@tabler/icons-react';
import FeatureCard from './feature-card';
import SectionHeader from './section-header';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';

export default function Features() {
    return (
        <section className="grid md:grid-cols-1 rounded-lg gap-4 md:gap-6 p-10 bg-primary/10" id={SECTIONS_IDS.features}>
            <SectionHeader
                label="BUILT FOR LOCAL PROS"
                title="Everything you need to turn finished projects into future work."
                description="Whether you're a roofer, landscaper, electrician, or general contractor, your best marketing is the work
                    you've already completed. We help you show it off in the places your customers are already looking."
                // center={false}
            />

            <div className="grid md:grid-cols-4 sm:grid-cols-2 flex-1 gap-4">
                <FeatureCard
                    Icon={IconMapPin}
                    title="Visual map of trust"
                    description="Show exactly where you’ve worked so new customers can see you’re active in their neighborhood."
                />
                <FeatureCard
                    Icon={IconShield}
                    title="Lead-ready profiles"
                    description="Each project links back to your business with photos, description, and a clear call-to-action."
                />
                <FeatureCard
                    Icon={IconSparkles}
                    title="Website-ready embed"
                    description="Drop your interactive map into any site in a few clicks — no custom code required."
                />
                <FeatureCard
                    Icon={IconArrowRight}
                    title="Simple for your team"
                    description="Add a project in seconds from the field: address, photos, and notes from your phone."
                />
            </div>
        </section>
    );
}
