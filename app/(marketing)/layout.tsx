import Footer from '@/components/public-pages-ui/footer';
import NavbarMain from '@/components/public-pages-ui/navbars/navbar-main';
import { ChildrenProp } from '@/lib/types/common';

export default function Layout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col bg-muted">
            <NavbarMain />
            <main className="flex-1 overflow-x-hidden mb-auto">{children}</main>
            <Footer />
        </div>
    );
}
