import Footer from '@/components/public-pages-ui/footer';
import Navbar from '@/components/public-pages-ui/navbar';
import Container from '@/components/ui/container';
import { ChildrenProp } from '@/lib/types/common';

export default function Layout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col md:gap-6 gap-4  bg-background">
            <Navbar />
            <main className="flex-1 overflow-x-hidden mb-auto">
                <Container>{children}</Container>
            </main>
            <Footer />
        </div>
    );
}
