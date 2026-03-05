import { useMap } from '@/lib/contexts/map-context';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';

export default function MapCotrols() {
    const { map } = useMap();

    const zoomIn = () => map?.zoomIn();
    const zoomOut = () => map?.zoomOut();

    return (
        <ButtonGroup orientation="vertical" aria-label="Media controls" className="h-fit">
            <Button variant="outline" size="icon" onClick={zoomIn}>
                <IconPlus />
            </Button>
            <Button variant="outline" size="icon" onClick={zoomOut}>
                <IconMinus />
            </Button>
        </ButtonGroup>
    );
}
