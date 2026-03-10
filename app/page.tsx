import Navbar from '@/components/public-pages-ui/navbar';
import Container from '@/components/ui/container';

export default function Home() {
    return (
        <div className="flex flex-col md:gap-6 gap-4 min-h-screen overflow-x-hidden">
            <Navbar />
            <main>
                <Container></Container>
            </main>
        </div>
    );
}
