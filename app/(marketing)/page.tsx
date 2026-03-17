import Cta from './_components/cta';
import Hero from './_components/hero';
import HowItWorks from './_components/how-it-works';
import LiveMap from './_components/live-map';

export default function Home() {
    return (
        <div className="flex flex-col gap-10 my-10">
            <Hero />
            <HowItWorks />
            <LiveMap />
            <Cta />
        </div>
    );
}
