import P from '@/components/typography/P';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import SectionHeader from './section-header';
import Container from '@/components/ui/container';
export default function AboutUs() {
    return (
        <Container>
            <div className="relative bg-primary/5 p-13 rounded-lg">
                <section className="flex flex-col items-center gap-4 z-1" id={SECTIONS_IDS.aboutUs}>
                    <SectionHeader
                        label="ABOUT US"
                        title={
                            <span>
                                Project <span className="text-primary">Vu</span> turns your completed projects into a professional portfolio
                            </span>
                        }
                    />

                    <P className="text-md text-center text-foreground">
                        Project Vu helps professionals showcase their work through a visual, interactive portfolio. Display completed
                        projects with photos, locations, and key details all in one place. Use it as a standalone portfolio or alongside
                        your existing website. Clients can explore your work on an interactive map or in a simple project list, helping you
                        build credibility and win more opportunities.
                    </P>
                </section>
            </div>
        </Container>
    );
}
