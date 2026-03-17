import { Badge } from '@/components/ui/badge';
import { IconCircleFilled } from '@tabler/icons-react';

export default function LiveMap() {
    return (
        <section>
            <Badge variant="secondary">
                <IconCircleFilled className="size-3 text-green-500 animate-pulse" />
                Live demo map
            </Badge>
            <div className="mt-3 rounded-lg overflow-hidden">
                <iframe src="http://localhost:3000/embed/demo-contructor" width="100%" height="800" title="Map"></iframe>
            </div>
        </section>
    );
}
