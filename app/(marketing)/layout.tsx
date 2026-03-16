import Footer from '@/components/public-pages-ui/footer';
import Navbar from '@/components/public-pages-ui/navbar';
import Container from '@/components/ui/container';
import { ChildrenProp } from '@/lib/types/common';
import React from 'react';

export default function Layout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col md:gap-6 gap-4 min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-1 mb-auto">
                <Container>{children}</Container>
            </main>
            <Footer />
        </div>
    );
}
