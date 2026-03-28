import P from '@/components/typography/P';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import SectionHeader from './section-header';
import Container from '@/components/ui/container';
export default function AboutUs() {
    return (
        <Container>
            <div className="relative bg-primary/5 p-10 rounded-lg">
                <section className="flex flex-col items-center gap-4 md:gap-6 z-1" id={SECTIONS_IDS.aboutUs}>
                    <SectionHeader
                        label="ABOUT US"
                        title={
                            <span>
                                Project <span className="text-primary">Vu</span> turns your completed projects into a professional portfolio
                            </span>
                        }
                    />

                    <P className="text text-md text-center leading-6 text-foreground">
                        Project Vu is a modern platform that helps professionals showcase their work in a clear, visual, and compelling way
                        . We turn your completed projects into a professional portfolio, combining photos, locations, and key details all in
                        one place. Project Vu can act as a mini website if you don&apos;t have one, or it can work alongside your existing
                        website to enhance your online presence. Your projects can be viewed on an interactive map or in a clean list
                        format, giving clients a complete picture of what you&apos;ve done and where you&apos;ve done it. Our goal is
                        simple: helping you showcase your work at its best and win more opportunities.
                    </P>
                </section>
            </div>
        </Container>
    );
}
