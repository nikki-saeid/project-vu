import Cta from './_components/cta';
import Hero from './_components/hero';
import Features from './_components/features';
import LiveMap from './_components/live-map';
import AboutUs from './_components/about-us';

export default function Home() {
 

    return (
        <div className="flex flex-col gap-20 my-20">
            <Hero />
            <Features />
            <LiveMap />
            <AboutUs />
            {/* <Cta /> */}
        </div>
    );
}
