'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import NavbarLivePage from '@/components/public-pages-ui/navbars/navbar-live-page';
import Container from '@/components/ui/container';
import WarningAlert from '@/components/warning-alert';
import { usePublic } from '@/lib/contexts/public-context';
import { useUser } from '@/lib/contexts/user-context';

type MainPageProps = { slug: string };

export default function MainPage({ slug }: MainPageProps) {
    const { business, projects } = usePublic();
    const { user } = useUser();

    return (
        <div className="flex flex-col bg-background min-h-screen">
            <NavbarLivePage url={user && business?.slug === slug ? '/dashboard/live-page' : '/'} />

            <div className="py-4 md:py-6">
                <Container>
                    <div className="flex flex-col gap-4 md:gap-6">
                        {business?.page_status === 'draft' && (
                            <WarningAlert
                                title="The portfolio is not live yet."
                                description="In order to show the portfolio publicly, you need to publish it."
                            />
                        )}
                        <BusinessProfile business={business} projects={projects} isPublic={true} />
                    </div>
                </Container>
            </div>
        </div>
    );
}
