import P from '@/components/typography/P';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import SectionHeader from './section-header';
import Container from '@/components/ui/container';
export default function AboutUs() {
    return (
        <Container>
            <div className="relative bg-primary/5 p-10 rounded-lg ">
                <section className="flex flex-col items-center gap-4 md:gap-6 z-1" id={SECTIONS_IDS.aboutUs}>
                    <div className="sm:hidden block">
                        <SectionHeader
                            center={false}
                            label="ABOUT US"
                            title="ProjectVu turns your completed projects into a professional portfolio"
                        />
                    </div>
                    <div className="sm:block hidden">
                        <SectionHeader label="ABOUT US" title="ProjectVu turns your completed projects into a professional portfolio" />
                    </div>

                    <P className="text text-md sm:text-center leading-7 text-foreground">
                        <strong>ProjectVu</strong> is a modern platform that helps professionals showcase their work in a clear, visual, and
                        compelling way . We turn your completed projects into a professional portfolio, combining photos, locations, and key
                        details all in one place. <strong>ProjectVu can act as a mini website if you don&apos;t have one</strong>, or it can{' '}
                        <strong>work alongside your existing website</strong> to enhance your online presence. Your projects can be viewed
                        on an <strong>interactive map </strong>or in a <strong>clean list format</strong>, giving clients a complete picture
                        of what you&apos;ve done and where you&apos;ve done it. Our goal is simple:{' '}
                        <strong>helping you showcase your work at its best and win more opportunities.</strong>
                    </P>
                </section>
            </div>
        </Container>
    );
}
