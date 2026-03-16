import Logo from '@/components/logo';
import P from '@/components/typography/P';
import Container from '@/components/ui/container';
import { BASE_URL } from '@/lib/constants/urls';

export default function Footer() {
    return (
        <footer className="bg-gray-900 py-4 md:py-6">
            <Container className="flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <Logo isWhite />


                    <div className="flex items-center gap-2">
                        
                    </div>
                </div>
                <P className="text-white text-center">
                    © {new Date().getFullYear()} {BASE_URL} All rights reserved.
                </P>
            </Container>
        </footer>
    );
}
