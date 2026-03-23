import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { LIVE_MAP_URL } from '@/lib/constants/urls';
import SectionHeader from './section-header';

export default function LiveMap() {
    return (
        <section id={SECTIONS_IDS.liveMap}>
            {/* <Badge variant="outline">
                <IconCircleFilled className="size-3 text-green-500 animate-pulse" />
                Live demo map
            </Badge> */}

            <SectionHeader
                label="LIVE DEMO MAP"
                title="Showcase your projects with interactive map"
                // description="Whether you're a roofer, landscaper, electrician, or general contractor, your best marketing is the work
                //                 you've already completed. We help you show it off in the places your customers are already looking."
                // center={false}
                // secondary
            />
            <div className="mt-3 rounded-lg overflow-hidden">
                <iframe src={LIVE_MAP_URL} width="100%" height="400" title="Map"></iframe>
            </div>
        </section>
    );
}
