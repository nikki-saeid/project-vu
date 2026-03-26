import AboutUs from './_components/about-us';
import Cta from './_components/cta';
import Features from './_components/features';
import Hero from './_components/hero';
import LiveMap from './_components/live-map';
import PricingPlans from './_components/pricing-plans';

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            <Hero />
            <LiveMap />
            <Features />
            <AboutUs />
            <PricingPlans />
            <Cta />
        </div>
    );
}
