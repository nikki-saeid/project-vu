import { Badge } from '@/components/ui/badge';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { LIVE_MAP_URL } from '@/lib/constants/urls';
import { IconCircleFilled } from '@tabler/icons-react';

export default function LiveMap() {
    return (
        <section id={SECTIONS_IDS.liveMap}>
            <Badge variant="outline">
                <IconCircleFilled className="size-3 text-green-500 animate-pulse" />
                Live demo map
            </Badge>
            <div className="mt-3 rounded-lg overflow-hidden">
                <iframe src={LIVE_MAP_URL} width="100%" height="400" title="Map"></iframe>
            </div>
        </section>
    );
}
