import { ChartAreaInteractive } from './_components/chart-area-interactive';
import { SectionCards } from './_components/section-cards';

export default function Overview() {
    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <SectionCards />
            <ChartAreaInteractive />
        </div>
    );
}
