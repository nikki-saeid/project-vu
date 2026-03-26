import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { LIVE_MAP_URL } from '@/lib/constants/urls';
import SectionHeader from './section-header';
import Container from '@/components/ui/container';

export default function LiveMap() {
    return (
        <Container>
            <section id={SECTIONS_IDS.liveMap}>
                <SectionHeader label="LIVE DEMO MAP" title="Showcase your projects with interactive map" />
                <div className="mt-3 rounded-lg overflow-hidden">
                    <iframe src={LIVE_MAP_URL} width="100%" height="400" title="Map"></iframe>
                </div>
            </section>
        </Container>
    );
}
