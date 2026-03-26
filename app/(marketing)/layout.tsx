import Footer from '@/components/public-pages-ui/footer';
import Navbar from '@/components/public-pages-ui/navbar';
import { ChildrenProp } from '@/lib/types/common';

export default function Layout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col  bg-background">
            <Navbar />
            <main className="flex-1 overflow-x-hidden mb-auto">{children}</main>
            <Footer />
        </div>
    );
}
