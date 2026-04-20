import ContactBagde from '@/components/contact-bagde';
import Container from '@/components/ui/container';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import SectionHeader from './section-header';

export default function Contact() {
    return (
        <section id={SECTIONS_IDS.contact}>
            <Container>
                <div className="p-10 rounded-lg border shadow-none bg-transparent flex flex-col gap-4 md:gap-6 items-center ">
                    <SectionHeader
                        label="CONTCAT"
                        description="We are here for you, connect with us at any time, Email us at the address below and we will get back to you as soon as possible."
                    />

                    <ContactBagde />
                </div>
            </Container>
        </section>
    );
}
